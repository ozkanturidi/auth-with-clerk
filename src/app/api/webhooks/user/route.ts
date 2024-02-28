import { getXataClient } from "@/xata";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

async function handler(request: Request) {
  const xataClient = getXataClient();
  const payload = await request.json();
  const headersList = headers();

  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };

  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (error) {
    console.error((error as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  if (!evt) {
    // Handle case where event is null
    console.error("Event is null");
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  type EventType = "user.created" | "user.updated" | "*";

  type Event = {
    data: Record<string, string | number>;
    object: "event";
    type: EventType;
  };

  if (eventType === "user.created") {
    const { id, ...attributes } = evt.data;
    console.log(id);
    console.log(attributes);
    await xataClient.db.users.create({
      externalId: String(id),
      firstname: String(attributes.first_name),
      lastname: String(attributes.last_name),
      imageurl: String(attributes.image_url),
    });
    return NextResponse.json({ success: true });
  } else {
    console.log(`Unhandled event type: ${eventType}`);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export const POST = handler;
