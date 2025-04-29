import { NextResponse } from "next/server";
import { prisma } from '@/lib/db'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({
            msg: "Please fill all the fields",
            status: 400
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        return NextResponse.json({
            msg: "User not found",
            status: 404
        })
    }

    const isPasswordValid = user.password && await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return NextResponse.json({
            msg: "Invalid password",
            status: 401
        })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: "1d"
    });

    return NextResponse.json({
        msg: "Login successful",
        status: 200,
        token
    })
}