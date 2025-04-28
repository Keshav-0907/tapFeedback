import { NextResponse } from "next/server";
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
    const { name, email, password } = await request.json();

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (existingUser) {
        return NextResponse.json({
            msg: "User already exists",
        })
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    });

    return NextResponse.json({
        msg: "User created",
        newUser: user
    })
}