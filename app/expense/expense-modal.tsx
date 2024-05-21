"use client"

import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';



export function ExpenseForm() {
  const { control, handleSubmit } = useForm<ExpenseFormData>();

  const onSubmit = (data: ExpenseFormData) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Expense</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Controller
                name="description"
                control={control}
                render={({ field }) => <Input placeholder="Expense description" {...field} />}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Amount</FormLabel>
            <FormControl>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => <Input type="number" placeholder="0.00" {...field} />}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <option value="food">Food</option>
                    <option value="transportation">Transportation</option>
                    <option value="entertainment">Entertainment</option>
                  </Select>
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <Controller
                name="date"
                control={control}
                render={({ field }) => <Input type="date" {...field} />}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}