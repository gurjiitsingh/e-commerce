ALTER TABLE "product" RENAME COLUMN "productId" TO "id";--> statement-breakpoint
ALTER TABLE "product" RENAME COLUMN "productCat" TO "category";--> statement-breakpoint
ALTER TABLE "product" RENAME COLUMN "productDesc" TO "Desc";--> statement-breakpoint
ALTER TABLE "orderDetail" DROP CONSTRAINT "orderDetail_productId_product_productId_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderDetail" ADD CONSTRAINT "orderDetail_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
