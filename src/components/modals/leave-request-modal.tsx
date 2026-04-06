"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Send } from "lucide-react"
import { useTransition } from "react"
import { createLeaveRequest } from "@/lib/actions/leave-request"

const leaveRequestSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  leaveType: z.string().min(1, "Leave type is required"),
  category: z.string().min(1, "Category is required"),
  filingType: z.string().min(1, "Filing type is required"),
  reason: z.string().min(1, "Reason is required"),
})

type LeaveRequestValues = z.infer<typeof leaveRequestSchema>

type LeaveRequestModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeaveRequestModal({ open, onOpenChange }: LeaveRequestModalProps) {
  const [isPending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LeaveRequestValues>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      leaveType: "",
      category: "",
      filingType: "",
      reason: "",
    },
  })

  function onSubmit(data: LeaveRequestValues) {
    startTransition(async () => {
      await createLeaveRequest({
        startDate: data.startDate,
        endDate: data.endDate,
        leaveType: data.leaveType as "VACATION" | "SICK" | "PERSONAL" | "BEREAVEMENT" | "MATERNITY" | "PATERNITY",
        category: data.category as "PLANNED" | "UNPLANNED" | "EMERGENCY",
        filingType: data.filingType as "FULL_DAY" | "HALF_DAY" | "UNDERTIME",
        reason: data.reason,
      })
      reset()
      onOpenChange(false)
    })
  }

  function handleClose(isOpen: boolean) {
    if (!isOpen) reset()
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Leave Request</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" {...register("startDate")} />
              {errors.startDate && (
                <p className="text-xs text-destructive">{errors.startDate.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" {...register("endDate")} />
              {errors.endDate && (
                <p className="text-xs text-destructive">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Leave Type</Label>
            <Select onValueChange={(val) => setValue("leaveType", val as string, { shouldValidate: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VACATION">Vacation</SelectItem>
                <SelectItem value="SICK">Sick</SelectItem>
                <SelectItem value="PERSONAL">Personal</SelectItem>
                <SelectItem value="BEREAVEMENT">Bereavement</SelectItem>
                <SelectItem value="MATERNITY">Maternity</SelectItem>
                <SelectItem value="PATERNITY">Paternity</SelectItem>
              </SelectContent>
            </Select>
            {errors.leaveType && (
              <p className="text-xs text-destructive">{errors.leaveType.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select onValueChange={(val) => setValue("category", val as string, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLANNED">Planned</SelectItem>
                  <SelectItem value="UNPLANNED">Unplanned</SelectItem>
                  <SelectItem value="EMERGENCY">Emergency</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-destructive">{errors.category.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Filing Type</Label>
              <Select onValueChange={(val) => setValue("filingType", val as string, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select filing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FULL_DAY">Full Day</SelectItem>
                  <SelectItem value="HALF_DAY">Half Day</SelectItem>
                  <SelectItem value="UNDERTIME">Undertime</SelectItem>
                </SelectContent>
              </Select>
              {errors.filingType && (
                <p className="text-xs text-destructive">{errors.filingType.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              placeholder="Describe your reason for leave..."
              rows={3}
              {...register("reason")}
            />
            {errors.reason && (
              <p className="text-xs text-destructive">{errors.reason.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments (max 2 files)</Label>
            <Input id="attachments" type="file" multiple accept="*/*" />
            <p className="text-xs text-muted-foreground">Optional — drag and drop or click to upload</p>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => handleClose(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"} <Send />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
