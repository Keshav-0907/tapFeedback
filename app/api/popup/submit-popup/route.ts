import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const allowedOrigin = '*'; 

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { popupId, rating, feedback } = await req.json();

    if (!popupId || !rating) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newFeedback = await prisma.feedback.create({
      data: {
        popupId,
        rating,
        feedback : feedback || null,
      },
    })

    if (!newFeedback) {
      return NextResponse.json({ message: 'Failed to submit feedback' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Feedback submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('[FEEDBACK_SUBMIT_ERROR]', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
