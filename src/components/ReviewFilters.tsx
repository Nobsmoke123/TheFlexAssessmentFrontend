import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { CalendarIcon, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { IChannels, ReviewFilters as IReviewFilters } from "@/lib/api";

interface ReviewFiltersProps {
  filters: IReviewFilters;
  channels: IChannels[];
  onFiltersChange: (filters: IReviewFilters) => void;
}

export const ReviewFilters = ({
  filters,
  channels,
  onFiltersChange,
}: ReviewFiltersProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [ratingMin, setRatingMin] = useState([filters.ratingMin || 1]);

  const handleFilterChange = (key: keyof IReviewFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({});
    setStartDate(undefined);
    setEndDate(undefined);
    setRatingMin([1]);
  };

  const handleDateRangeApply = () => {
    onFiltersChange({
      ...filters,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Rating Filter */}
          <div className="space-y-2">
            <Label>Minimum Rating</Label>
            <div className="px-2">
              <Slider
                value={ratingMin}
                onValueChange={(value) => {
                  setRatingMin(value);
                  handleFilterChange("ratingMin", value[0]);
                }}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1</span>
                <span className="font-medium">{ratingMin[0]} stars</span>
                <span>5</span>
              </div>
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={filters.status || "all"}
              onValueChange={(value) =>
                handleFilterChange(
                  "status",
                  value === "all" ? undefined : value
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="published">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Channel Filter */}
          <div className="space-y-2">
            <Label>Channel</Label>
            <Select
              value={filters.channelId || "all"}
              onValueChange={(value) =>
                handleFilterChange(
                  "channelId",
                  value === "all" ? undefined : value
                )
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={channels && channels[0].displayName}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all"> All Channels </SelectItem>
                {channels &&
                  channels.map((channel) => (
                    <SelectItem
                      value={channel.id.toString()}
                      key={channel.id.toString() + channel.name}
                    >
                      {channel.displayName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Filter */}
          <div className="space-y-2">
            <Label>Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate && endDate
                    ? `${format(startDate, "MMM dd")} - ${format(
                        endDate,
                        "MMM dd"
                      )}`
                    : "Pick dates"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="flex">
                  <div className="border-r">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      className="pointer-events-auto"
                    />
                  </div>
                  <div>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      className="pointer-events-auto"
                    />
                  </div>
                </div>
                <div className="p-3 border-t flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setStartDate(undefined);
                      setEndDate(undefined);
                    }}
                  >
                    Clear
                  </Button>
                  <Button size="sm" onClick={handleDateRangeApply}>
                    Apply
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Sort Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t">
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select
              value={filters.sortBy || "createdAt"}
              onValueChange={(value) => handleFilterChange("sortBy", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Date</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Order</Label>
            <Select
              value={filters.sortOrder || "desc"}
              onValueChange={(value) => handleFilterChange("sortOrder", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest First</SelectItem>
                <SelectItem value="asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Review Type</Label>
            <Select
              value={filters.reviewType || "all"}
              onValueChange={(value) => handleFilterChange("reviewType", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all"> All Review Types </SelectItem>
                <SelectItem value="guest-to-host">Guest to Host</SelectItem>
                <SelectItem value="host-to-guest">Host to Guest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
