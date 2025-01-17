DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'maintainer', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"addressId" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"userId" uuid,
	"mobNo" varchar,
	"addressLine1" varchar NOT NULL,
	"addressLine2" varchar,
	"city" varchar,
	"state" varchar,
	"zipcode" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "brand" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"desc" varchar,
	"slug" varchar,
	"imgUrl" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"desc" varchar,
	"slug" varchar,
	"imgUrl" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orderDetail" (
	"orderDetailId" serial PRIMARY KEY NOT NULL,
	"orderId" integer,
	"productId" uuid,
	"quantity" integer,
	"subtotal" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orderHeader" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" uuid,
	"orderDate" timestamp DEFAULT now() NOT NULL,
	"totalAmount" varchar,
	"shipingID" integer,
	"ShippingAddressID" integer,
	"BillingAddressID" integer,
	"orderStatus" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"price" varchar NOT NULL,
	"brand" varchar NOT NULL,
	"category" varchar NOT NULL,
	"Desc" varchar NOT NULL,
	"image" varchar NOT NULL,
	"isFeatured" boolean,
	"weight" varchar,
	"dimensions" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"registerdate" timestamp DEFAULT now() NOT NULL,
	"isVerfied" varchar,
	"role" "role" DEFAULT 'user' NOT NULL,
	"forgotPasswordToken" varchar,
	"forgotPasswordTokenExpiry" timestamp,
	"verifyToken" varchar,
	"verifyTokenExpiry" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderDetail" ADD CONSTRAINT "orderDetail_orderId_orderHeader_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orderHeader"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderDetail" ADD CONSTRAINT "orderDetail_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderHeader" ADD CONSTRAINT "orderHeader_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
