"use client";

import * as React from "react";
import useMediaQuery from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Currency = {
  value: string;
  label: string;
};

const currencies: Currency[] = [
  {
    value: "USD",
    label: "United States Dollar",
  },
  {
    value: "EUR",
    label: "Euro",
  },
  {
    value: "GBP",
    label: "British Pound",
  },
  {
    value: "JPY",
    label: "Japanese Yen",
  },
  {
    value: "KES",
    label: "Kenyan Shilling",
  },
];

export function SelectCurrency() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedCurrency, setSelectedCurrency] =
    React.useState<Currency | null>(null);

  if (isDesktop) {
    return (
      <div className="flex flex-col w-full h-full min-h-screen items-center justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar>
            <AvatarImage
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              alt="User Image"
            />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col space-y-1.5 items-center justify-center">
          <span>
            <h1>Welcome, "USER"!</h1>
          </span>
          <span>
            <h3>Let's get started by setting up your currency</h3>
          </span>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-3 gap-5">
          <Card className="w-full h-full max-w-[700px] max-h-[600px] relative z-10">
            <CardHeader>
              <CardTitle>Currency</CardTitle>
              <CardDescription>
                Select your default currency for transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      className="w-full bg-black text-white"
                    >
                      {selectedCurrency ? (
                        <>{selectedCurrency.value}</>
                      ) : (
                        <>USD</>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
                    <CurrencyList
                      setOpen={setOpen}
                      setSelectedCurrency={setSelectedCurrency}
                    />
                  </PopoverContent>
                </Popover>
              </form>
            </CardContent>
          </Card>
          <div className="w-full max-w-[700px]">
            <Button variant="outline" className="w-full bg-white text-black hover:bg-green-500">Confirm</Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full h-full min-h-screen items-center justify-center space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Avatar>
          <AvatarImage
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            alt="User Image"
          />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col space-y-1.5 items-center justify-center">
        <span>
          <h1>Welcome, "USER"!</h1>
        </span>
        <span>
          <h3>Let's get started by setting up your currency</h3>
        </span>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full p-3 gap-5">
        <Card className="w-full h-full max-w-[900px] max-h-[600px] relative z-10">
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>
              Select your default currency for transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 relative">
                  <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                      <Button
                        className="w-full bg-black text-white"
                      >
                        {selectedCurrency ? (
                          <>{selectedCurrency.value}</>
                        ) : (
                          <>USD</>
                        )}
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="">
                      <div className="mt-4 border-t">
                        <CurrencyList
                          setOpen={setOpen}
                          setSelectedCurrency={setSelectedCurrency}
                        />
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="w-full max-w-[900px]">
          <Button className="w-full bg-black text-white hover:bg-green-500">Confirm</Button>
        </div>
      </div>
    </div>
  );
}

function CurrencyList({
  setOpen,
  setSelectedCurrency,
}: {
  setOpen: (open: boolean) => void;
  setSelectedCurrency: (status: Currency | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter currency..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {currencies.map((status) => (
            <CommandItem
            className="hover:bg-gray-300"
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedCurrency(
                  currencies.find((priority) => priority.value === value) ||
                    null
                );
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
