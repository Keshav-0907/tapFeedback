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
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.post('/api/popup/get-feedbacks', { popupId });
        if (res.status !== 200) throw new Error('Failed to fetch responses');
        setResponseData(res.data.feedbacks);
      } catch (error) {
        console.error('Error fetching responses:', error);
      }
    };

    fetchResponses();
  }, [popupId]);

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

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm py-4 px-2 my-4 mx-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="p-0 flex items-center gap-2"
                onClick={() => handleSort("rating")}
              >
                Rating
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="p-0 flex items-center gap-2"
                onClick={() => handleSort("createdAt")}
              >
                Created At
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedData.length > 0 ? (
            sortedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="max-w-[160px] truncate">{item.id}</TableCell>
                <TableCell>{item.rating}</TableCell>
                <TableCell className="max-w-[200px] truncate text-muted-foreground">
                  {item.feedback || <span className="italic text-gray-400">No feedback</span>}
                </TableCell>
                <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                No responses yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Responses;
