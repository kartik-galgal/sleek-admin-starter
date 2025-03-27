import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { 
  Popover, PopoverContent, PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  Plus,
  X,
  Bell,
  PlusCircle,
  Search,
  Settings,
  User,
  Smartphone,
  Laptop,
  TabletSmartphone,
  MessageSquare,
  Mail,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
} from 'lucide-react';

const UIComponents = () => {
  const [date, setDate] = useState<Date>();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">UI Components</h1>
        <p className="text-muted-foreground">Explore and use the available UI components</p>
      </div>
      
      <Tabs defaultValue="date-picker" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="date-picker">Date Picker</TabsTrigger>
          <TabsTrigger value="selections">Selection Controls</TabsTrigger>
          <TabsTrigger value="buttons">Buttons & Badges</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Date Picker Tab */}
        <TabsContent value="date-picker">
          <Card>
            <CardHeader>
              <CardTitle>Date Picker</CardTitle>
              <CardDescription>
                Calendar component for date selection.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="date">Choose a date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full md:w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Range Selection</h3>
                <div className="flex flex-col gap-2">
                  <div className="grid gap-2">
                    <Label>Start date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full md:w-[300px] justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Pick start date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar 
                          mode="single"
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label>End date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full md:w-[300px] justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Pick end date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar 
                          mode="single"
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Date Picker with Presets</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Today</Button>
                  <Button variant="outline" size="sm">Yesterday</Button>
                  <Button variant="outline" size="sm">Last 7 days</Button>
                  <Button variant="outline" size="sm">Last 30 days</Button>
                  <Button variant="outline" size="sm">This month</Button>
                  <Button variant="outline" size="sm">Last month</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                The date picker component uses <code>date-fns</code> for date formatting and manipulation.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Selection Controls Tab */}
        <TabsContent value="selections">
          <Card>
            <CardHeader>
              <CardTitle>Selection Controls</CardTitle>
              <CardDescription>
                Checkboxes, radio buttons, selects, and other input components.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Radio Buttons</h3>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Option One</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Option Two</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-three" id="option-three" disabled />
                      <Label htmlFor="option-three" className="text-muted-foreground">
                        Option Three (Disabled)
                      </Label>
                    </div>
                  </RadioGroup>

                  <h3 className="text-lg font-medium mt-6">Checkboxes</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms1" />
                      <Label htmlFor="terms1">Accept terms and conditions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms2" defaultChecked />
                      <Label htmlFor="terms2">Email me about updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms3" disabled />
                      <Label htmlFor="terms3" className="text-muted-foreground">
                        Disabled option
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Switches</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="airplane-mode" />
                      <Label htmlFor="airplane-mode">Airplane Mode</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="notifications" defaultChecked />
                      <Label htmlFor="notifications">Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="disabled-switch" disabled />
                      <Label htmlFor="disabled-switch" className="text-muted-foreground">
                        Disabled
                      </Label>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mt-6">Multi-Select</h3>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a device" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mobile">
                        <div className="flex items-center">
                          <Smartphone className="mr-2 h-4 w-4" />
                          <span>Mobile</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="desktop">
                        <div className="flex items-center">
                          <Laptop className="mr-2 h-4 w-4" />
                          <span>Desktop</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="tablet">
                        <div className="flex items-center">
                          <TabletSmartphone className="mr-2 h-4 w-4" />
                          <span>Tablet</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Slider</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="slider1">Opacity</Label>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <Slider id="slider1" defaultValue={[75]} max={100} step={1} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="slider2">Price Range</Label>
                      <span className="text-sm text-muted-foreground">$200-$800</span>
                    </div>
                    <Slider id="slider2" defaultValue={[200, 800]} min={0} max={1000} step={10} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Accordion</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It comes with default styles that matches the other components' aesthetic.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It's animated by default, but you can disable it if you prefer.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Buttons Tab */}
        <TabsContent value="buttons">
          <Card>
            <CardHeader>
              <CardTitle>Buttons & Badges</CardTitle>
              <CardDescription>
                Various button styles and badge components.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Button Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Button Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Button States</h3>
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" disabled>Disabled</Button>
                  <Button>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    Loading
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Icon Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Badges</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Badge with Icons</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge className="flex items-center gap-1">
                    <Check className="h-3 w-3" /> Completed
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <PlusCircle className="h-3 w-3" /> New
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Mail className="h-3 w-3" /> 5 unread
                  </Badge>
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <X className="h-3 w-3" /> Cancelled
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Custom Badges</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="badge badge-primary">Primary</span>
                  <span className="badge badge-secondary">Secondary</span>
                  <span className="badge badge-success">Success</span>
                  <span className="badge badge-danger">Danger</span>
                  <span className="badge badge-warning">Warning</span>
                  <span className="badge badge-info">Info</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alert Dialog</h3>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Toast notifications and alerts to provide feedback to users.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Toast Notifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => {
                      toast.success("Success toast", {
                        description: "Your action was completed successfully.",
                      });
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Show Success Toast
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      toast.info("Info toast", {
                        description: "Here's some information you should know.",
                      });
                    }}
                  >
                    <Info className="mr-2 h-4 w-4" />
                    Show Info Toast
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      toast.error("Error toast", {
                        description: "There was a problem with your request.",
                      });
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Show Error Toast
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.warning("Warning toast", {
                        description: "Please be careful with this action.",
                      });
                    }}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Show Warning Toast
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Toast with Actions</h3>
                <Button
                  onClick={() => {
                    toast("Toast with action", {
                      description: "You can add actions to toasts.",
                      action: {
                        label: "Undo",
                        onClick: () => toast.success("Action clicked"),
                      },
                    });
                  }}
                >
                  Show Toast with Action
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Toast Positions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.success("Top", { position: "top-center" });
                    }}
                  >
                    Top
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.success("Top Center", { position: "top-center" });
                    }}
                  >
                    Top Center
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.success("Top Right", { position: "top-right" });
                    }}
                  >
                    Top Right
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.success("Bottom Left", { position: "bottom-left" });
                    }}
                  >
                    Bottom Left
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.success("Bottom Center", { position: "bottom-center" });
                    }}
                  >
                    Bottom Center
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.success("Bottom Right", { position: "bottom-right" });
                    }}
                  >
                    Bottom Right
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Custom Notifications</h3>
                <Button
                  onClick={() => {
                    toast(
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full bg-primary/20 mr-3 flex items-center justify-center">
                          <Bell className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">New Message</h3>
                          <p className="text-sm text-muted-foreground">
                            You have a new message from Jane Smith.
                          </p>
                        </div>
                      </div>,
                      {
                        action: {
                          label: "View",
                          onClick: () => console.log("View message"),
                        },
                      }
                    );
                  }}
                >
                  Show Custom Notification
                </Button>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <p className="text-sm text-muted-foreground">
                Toast notifications use the <code>sonner</code> package for efficient toast management.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UIComponents;
