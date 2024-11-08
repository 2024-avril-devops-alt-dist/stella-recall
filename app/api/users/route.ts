import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Error fetching users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password, // Remember to hash in production
        phoneNotification: body.phoneNotification || false,
        phoneNumber: body.phoneNumber || null,
      },
    })
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Error creating user' },
      { status: 500 }
    )
  }
}