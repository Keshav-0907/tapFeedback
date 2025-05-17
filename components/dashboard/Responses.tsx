'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ValueCard from './ValueCard';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface ResponsesProps {
  popupId: string;
}

interface FeedbackData {
  id: string;
  popupId: string;
  rating: number;
  feedback: string | null;
  createdAt: string;
}

const Responses = ({ popupId }: ResponsesProps) => {
  const [responseData, setResponseData] = useState<FeedbackData[]>([]);
  const [sortKey, setSortKey] = useState<keyof FeedbackData>('createdAt');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [impressionCount, setImpressionCount] = useState<number>(0);
  const [feedbackCount, setFeedbackCount] = useState<number>(0);

  const fetchResponses = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found");
        return;
      }

      setLoading(true);

      const res = await fetch("/api/popup/get-feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ popupId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch responses");
      }

      setResponseData(data.feedbacks || []);
      setImpressionCount(data.impressionCount || 0);
      setFeedbackCount(data.feedbacks ? data.feedbacks.length : 0);
    } catch (error) {
      console.error("Error fetching responses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (popupId) {
      fetchResponses();
    }
  }, [popupId]);

  const handleRefresh = async () => {
    await fetchResponses();
    toast.success("Responses refreshed successfully!");
  };

  const sortedData = [...responseData].sort((a, b) => {
    const aVal = a[sortKey] ?? '';
    const bVal = b[sortKey] ?? '';
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return sortAsc
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const handleSort = (key: keyof FeedbackData) => {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const CalculateFeedbackRate = (feedbacks: FeedbackData[], impressionCount: number) => {
    const feedbackCount = feedbacks.length;
    const clickRate = ((feedbackCount / impressionCount) * 100).toFixed(2);
    return clickRate;
  }

  return (
    <div className='py-4 px-2 mx-2 flex flex-col gap-4'>
      <div className='flex justify-end'>
        <Button disabled={loading} onClick={handleRefresh} variant="outline" className='cursor-pointer'>
          {loading ? <RotateCcw className="animate-spin" /> : <RotateCcw />}
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          <Skeleton className="h-[100px] w-full bg-accent" />
          <Skeleton className="h-[100px] w-full bg-accent" />
          <Skeleton className="h-[100px] w-full bg-accent" />
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          <ValueCard title="Total Impressions" value={impressionCount} />
          <ValueCard title="Total Feedbacks" value={feedbackCount} />
          <ValueCard title="Feedback Rate" value={`${CalculateFeedbackRate(sortedData, impressionCount)}%`} />
        </div>
      )}

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">
                <Button
                  variant="ghost"
                  className="p-0 flex items-center gap-2 justify-center w-full"
                  onClick={() => handleSort("rating")}
                >
                  Rating
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-center">Feedback</TableHead>
              <TableHead className="text-center">
                <Button
                  variant="ghost"
                  className="p-0 flex items-center gap-2 justify-center w-full"
                  onClick={() => handleSort("createdAt")}
                >
                  Created At
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>

          {loading ? (
            <TableBody>
              {[...Array(3)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-12 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-[80%] mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{item.rating}</TableCell>
                    <TableCell className="text-center max-w-[200px] truncate text-muted-foreground">
                      {item.feedback || <span className="italic text-gray-400">-</span>}
                    </TableCell>
                    <TableCell className="text-center">{new Date(item.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                    No responses yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Responses;
