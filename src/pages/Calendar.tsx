
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { 
  Popover, PopoverContent, PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { format, addDays, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { 
  CalendarIcon, ChevronLeft, ChevronRight, 
  Plus, Clock, MapPin, Users, CalendarDays,
  Check, X, Trash2
} from 'lucide-react';

// Types
interface Event {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  location?: string;
  description?: string;
  attendees?: number;
  category: 'meeting' | 'personal' | 'work' | 'holiday';
}

// Sample events data
const generateSampleEvents = (): Event[] => {
  const today = new Date();
  
  return [
    {
      id: '1',
      title: 'Team Meeting',
      date: today,
      startTime: '09:00',
      endTime: '10:30',
      location: 'Conference Room A',
      attendees: 8,
      category: 'meeting',
      description: 'Weekly sprint planning with the development team.'
    },
    {
      id: '2',
      title: 'Project Review',
      date: today,
      startTime: '14:00',
      endTime: '15:00',
      location: 'Virtual Meeting',
      attendees: 5,
      category: 'work',
      description: 'Review the progress of the current project with stakeholders.'
    },
    {
      id: '3',
      title: 'Dentist Appointment',
      date: addDays(today, 2),
      startTime: '11:00',
      endTime: '12:00',
      location: 'Dental Clinic',
      category: 'personal',
      description: 'Regular dental checkup.'
    },
    {
      id: '4',
      title: 'Client Presentation',
      date: addDays(today, 3),
      startTime: '13:00',
      endTime: '14:30',
      location: 'Meeting Room B',
      attendees: 12,
      category: 'work',
      description: 'Present the new product features to the client.'
    },
    {
      id: '5',
      title: 'Team Building',
      date: addDays(today, 5),
      startTime: '15:00',
      endTime: '18:00',
      location: 'City Park',
      attendees: 20,
      category: 'work',
      description: 'Outdoor team building activities.'
    },
    {
      id: '6',
      title: 'Independence Day',
      date: addDays(today, 10),
      category: 'holiday',
      description: 'Public holiday.'
    }
  ];
};

const CategoryColors = {
  meeting: 'bg-blue-500',
  personal: 'bg-purple-500',
  work: 'bg-green-500',
  holiday: 'bg-red-500',
};

const CalendarPage = () => {
  const [events, setEvents] = useState<Event[]>(generateSampleEvents());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('month');
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isViewEventOpen, setIsViewEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    date: new Date(),
    startTime: '',
    endTime: '',
    category: 'work',
  });

  // Get events for selected date
  const eventsForSelectedDate = events.filter(
    event => isSameDay(event.date, selectedDate)
  );

  // Add new event
  const handleAddEvent = () => {
    if (!newEvent.title) {
      toast.error('Please enter an event title');
      return;
    }

    const eventToAdd: Event = {
      id: Math.random().toString(36).substring(2, 9),
      title: newEvent.title || '',
      date: newEvent.date || new Date(),
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      location: newEvent.location,
      description: newEvent.description,
      attendees: newEvent.attendees,
      category: newEvent.category as 'meeting' | 'personal' | 'work' | 'holiday',
    };

    setEvents([...events, eventToAdd]);
    setIsAddEventOpen(false);
    setNewEvent({
      title: '',
      date: new Date(),
      startTime: '',
      endTime: '',
      category: 'work',
    });
    toast.success('Event added successfully');
  };

  // Delete event
  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    setIsViewEventOpen(false);
    toast.success('Event deleted successfully');
  };

  // Handle calendar date change
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  // View event details
  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsViewEventOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and events</p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0 gap-2">
          <Select value={viewMode} onValueChange={(value: 'day' | 'week' | 'month') => setViewMode(value)}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>
                  Fill in the details for your new event.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    value={newEvent.title || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newEvent.date ? format(newEvent.date, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={newEvent.date}
                          onSelect={(date) => setNewEvent({ ...newEvent, date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={newEvent.category} 
                      onValueChange={(value) => setNewEvent({ ...newEvent, category: value as any })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="holiday">Holiday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newEvent.startTime || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newEvent.endTime || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter location (optional)"
                    value={newEvent.location || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter description (optional)"
                    value={newEvent.description || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="attendees">Number of Attendees</Label>
                  <Input
                    id="attendees"
                    type="number"
                    placeholder="Enter number of attendees (optional)"
                    value={newEvent.attendees || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, attendees: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEvent}>
                  Create Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-8 hover-lift">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setSelectedDate(new Date())}>
                  <CalendarDays className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-lg font-semibold">
                    {format(selectedDate, 'MMMM yyyy')}
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center text-xs gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Meeting</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span>Personal</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Work</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Holiday</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              components={{
                DayContent: (props) => {
                  const date = props.date;
                  const eventsOnDay = events.filter(event => isSameDay(event.date, date));
                  
                  return (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className={cn(
                        "w-full h-full flex items-center justify-center",
                        selectedDate && isSameDay(date, selectedDate) && "bg-primary text-primary-foreground rounded-full"
                      )}>
                        {props.children}
                      </div>
                      {eventsOnDay.length > 0 && (
                        <div className="absolute bottom-1 flex gap-0.5 justify-center">
                          {eventsOnDay.slice(0, 3).map((event, i) => (
                            <div 
                              key={i} 
                              className={cn(
                                "w-1 h-1 rounded-full",
                                CategoryColors[event.category]
                              )}
                            />
                          ))}
                          {eventsOnDay.length > 3 && <div className="w-1 h-1 rounded-full bg-gray-400" />}
                        </div>
                      )}
                    </div>
                  );
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Events for Selected Day */}
        <Card className="lg:col-span-4 hover-lift">
          <CardHeader>
            <CardTitle>Events for {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
            <CardDescription>
              {eventsForSelectedDate.length === 0 
                ? "No events scheduled" 
                : `${eventsForSelectedDate.length} event${eventsForSelectedDate.length > 1 ? 's' : ''} scheduled`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {eventsForSelectedDate.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CalendarIcon className="h-12 w-12 text-muted-foreground opacity-30 mb-3" />
                <h3 className="text-lg font-medium">No events for this day</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Click the "Add Event" button to create a new event
                </p>
                <Button className="mt-4" onClick={() => setIsAddEventOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {eventsForSelectedDate.map((event) => (
                  <div 
                    key={event.id} 
                    className="p-3 rounded-lg border border-border hover:border-primary transition-colors duration-200 cursor-pointer"
                    onClick={() => handleViewEvent(event)}
                  >
                    <div className="flex gap-3">
                      <div className={cn(
                        "w-1 rounded-full self-stretch",
                        CategoryColors[event.category]
                      )} />
                      <div className="flex-1">
                        <h3 className="font-medium truncate">{event.title}</h3>
                        
                        {(event.startTime || event.endTime) && (
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>
                              {event.startTime} {event.endTime ? `- ${event.endTime}` : ''}
                            </span>
                          </div>
                        )}
                        
                        {event.location && (
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        
                        {event.attendees && (
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Users className="h-3 w-3 mr-1" />
                            <span>{event.attendees} attendee{event.attendees !== 1 ? 's' : ''}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* View Event Dialog */}
      <Dialog open={isViewEventOpen} onOpenChange={setIsViewEventOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    CategoryColors[selectedEvent.category]
                  )} />
                  <DialogTitle>{selectedEvent.title}</DialogTitle>
                </div>
                <DialogDescription>
                  {format(selectedEvent.date, 'EEEE, MMMM d, yyyy')}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                {(selectedEvent.startTime || selectedEvent.endTime) && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedEvent.startTime} {selectedEvent.endTime ? `- ${selectedEvent.endTime}` : ''}
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedEvent.location && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{selectedEvent.location}</p>
                    </div>
                  </div>
                )}
                
                {selectedEvent.description && (
                  <div className="flex items-start">
                    <div>
                      <p className="font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                    </div>
                  </div>
                )}
                
                {selectedEvent.attendees && (
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Attendees</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedEvent.attendees} attendee{selectedEvent.attendees !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter className="flex items-center space-x-2">
                <Button 
                  variant="destructive" 
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <Button onClick={() => setIsViewEventOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
