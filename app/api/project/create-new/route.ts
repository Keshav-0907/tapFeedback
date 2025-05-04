import { NextResponse } from "next/server";
import { prisma } from '@/lib/db';
import puppeteer from "puppeteer";
import { put } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { title, url, userId } = await request.json();

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const project = await prisma.project.create({
    data: {
      title,
      url,
      userId: user.id,
    },
  });

  if (!project) {
    return NextResponse.json({ message: "Project creation failed" }, { status: 500 });
  }

  // Launch Puppeteer and take screenshot
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const screenshotBuffer = await page.screenshot({ fullPage: true });
  await browser.close();

  // Upload to Vercel Blob
  const blobName = `screenshot-${uuidv4()}.png`;
  const blob = await put(blobName, Buffer.from(screenshotBuffer), {
    access: "public",
    contentType: "image/png",
  });

  // Save screenshot URL to DB
  const updatedProject = await prisma.project.update({
    where: { id: project.id },
    data: {
        screenshot: blob.url,
    },
  });

  // Create default popup
  const popup = await prisma.popup.create({
    data: {
      projectId: project.id,
      title: "We value your feedback!",
      titleSize: "20",
      titleColor: "#000000",
      backgroundColor: "#ffffff",
      textColor: "#000000",
      borderColor: "#cccccc",
      borderWidth: "1",
      borderRadius: "8",
      feedbackType: "text",
      showTextInput: true,
      ctaText: "Submit",
      ctaTextColor: "#ffffff",
      ctaBackgroundColor: "#000000",
      delay: 5,
      entryAnimation: "fade-in",
      exitAnimation: "fade-out"
    }
  });

  console.log("Screenshot URL:", blob.url);

  return NextResponse.json({
    message: "Project created with screenshot",
    project: updatedProject,
    popup,
  }, { status: 201 });
}
