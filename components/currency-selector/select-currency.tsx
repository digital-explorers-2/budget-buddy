import React from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command";
  
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
  

export function SelectCurrency()
{
    return(
        <div className="flex flex-col min-h-screen items-center justify-center space-y-6 pt-10">
            <div className="flex flex-col items-center space-y-4">
                <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" alt="User Image" />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col space-y-1.5 items-center justify-center">
                <span><h1>Welcome, "USER"!</h1></span>
                <span><h3>Let's get started by setting up your currency</h3></span>
            </div>
            
            <div className="flex min-h-screen items-start justify-center">
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle>Currency</CardTitle>
                        <CardDescription>Select your default currency for transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="currency">Currency</Label>
                                    <Select>
                                        <SelectTrigger id="currency">
                                            <SelectValue placeholder="USD" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="USD">USD - United States Dollar</SelectItem>
                                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                            <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Confirm</Button>
                    </CardFooter>
                </Card>
            </div>
            
        </div>
        
    )
}