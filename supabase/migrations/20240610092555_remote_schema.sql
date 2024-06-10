
create table "public"."analytics" (
    "id" uuid not null default gen_random_uuid(),
    "userid" uuid not null,
    "budgetid" uuid,
    "statisticstype" character varying(255) not null
);


create table "public"."budget" (
    "id" uuid not null default gen_random_uuid(),
    "userid" uuid not null,
    "name" character varying(255) not null,
    "totalamount" numeric(15,2) not null,
    "createddate" date not null
);


create table "public"."category" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying(255) not null,
    "type" text,
    "user_id" uuid
);


create table "public"."currency" (
    "id" uuid not null default gen_random_uuid(),
    "code" character varying(10) not null,
    "name" character varying(255) not null,
    "exchangerate" double precision not null
);


create table "public"."transaction" (
    "id" uuid not null default gen_random_uuid(),
    "budgetid" uuid,
    "categoryid" uuid,
    "amount" numeric(15,2) not null,
    "type" character varying(50) not null,
    "transactiondate" date not null,
    "description" text,
    "currencyid" uuid
);


drop sequence if exists "public"."notes_id_seq";

CREATE UNIQUE INDEX analytics_pkey ON public.analytics USING btree (id);

CREATE UNIQUE INDEX budget_pkey ON public.budget USING btree (id);

CREATE UNIQUE INDEX category_pkey ON public.category USING btree (id);

CREATE UNIQUE INDEX currency_pkey ON public.currency USING btree (id);

CREATE UNIQUE INDEX transaction_pkey ON public.transaction USING btree (id);

alter table "public"."analytics" add constraint "analytics_pkey" PRIMARY KEY using index "analytics_pkey";

alter table "public"."budget" add constraint "budget_pkey" PRIMARY KEY using index "budget_pkey";

alter table "public"."category" add constraint "category_pkey" PRIMARY KEY using index "category_pkey";

alter table "public"."currency" add constraint "currency_pkey" PRIMARY KEY using index "currency_pkey";

alter table "public"."transaction" add constraint "transaction_pkey" PRIMARY KEY using index "transaction_pkey";

alter table "public"."analytics" add constraint "analytics_budgetid_fkey" FOREIGN KEY (budgetid) REFERENCES budget(id) not valid;

alter table "public"."analytics" validate constraint "analytics_budgetid_fkey";

alter table "public"."analytics" add constraint "analytics_userid_fkey" FOREIGN KEY (userid) REFERENCES auth.users(id) not valid;

alter table "public"."analytics" validate constraint "analytics_userid_fkey";

alter table "public"."budget" add constraint "budget_userid_fkey" FOREIGN KEY (userid) REFERENCES auth.users(id) not valid;

alter table "public"."budget" validate constraint "budget_userid_fkey";

alter table "public"."category" add constraint "category_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."category" validate constraint "category_user_id_fkey";

alter table "public"."transaction" add constraint "transaction_budgetid_fkey" FOREIGN KEY (budgetid) REFERENCES budget(id) not valid;

alter table "public"."transaction" validate constraint "transaction_budgetid_fkey";

alter table "public"."transaction" add constraint "transaction_categoryid_fkey" FOREIGN KEY (categoryid) REFERENCES category(id) not valid;

alter table "public"."transaction" validate constraint "transaction_categoryid_fkey";

alter table "public"."transaction" add constraint "transaction_currencyid_fkey" FOREIGN KEY (currencyid) REFERENCES currency(id) not valid;

alter table "public"."transaction" validate constraint "transaction_currencyid_fkey";

grant delete on table "public"."analytics" to "anon";

grant insert on table "public"."analytics" to "anon";

grant references on table "public"."analytics" to "anon";

grant select on table "public"."analytics" to "anon";

grant trigger on table "public"."analytics" to "anon";

grant truncate on table "public"."analytics" to "anon";

grant update on table "public"."analytics" to "anon";

grant delete on table "public"."analytics" to "authenticated";

grant insert on table "public"."analytics" to "authenticated";

grant references on table "public"."analytics" to "authenticated";

grant select on table "public"."analytics" to "authenticated";

grant trigger on table "public"."analytics" to "authenticated";

grant truncate on table "public"."analytics" to "authenticated";

grant update on table "public"."analytics" to "authenticated";

grant delete on table "public"."analytics" to "service_role";

grant insert on table "public"."analytics" to "service_role";

grant references on table "public"."analytics" to "service_role";

grant select on table "public"."analytics" to "service_role";

grant trigger on table "public"."analytics" to "service_role";

grant truncate on table "public"."analytics" to "service_role";

grant update on table "public"."analytics" to "service_role";

grant delete on table "public"."budget" to "anon";

grant insert on table "public"."budget" to "anon";

grant references on table "public"."budget" to "anon";

grant select on table "public"."budget" to "anon";

grant trigger on table "public"."budget" to "anon";

grant truncate on table "public"."budget" to "anon";

grant update on table "public"."budget" to "anon";

grant delete on table "public"."budget" to "authenticated";

grant insert on table "public"."budget" to "authenticated";

grant references on table "public"."budget" to "authenticated";

grant select on table "public"."budget" to "authenticated";

grant trigger on table "public"."budget" to "authenticated";

grant truncate on table "public"."budget" to "authenticated";

grant update on table "public"."budget" to "authenticated";

grant delete on table "public"."budget" to "service_role";

grant insert on table "public"."budget" to "service_role";

grant references on table "public"."budget" to "service_role";

grant select on table "public"."budget" to "service_role";

grant trigger on table "public"."budget" to "service_role";

grant truncate on table "public"."budget" to "service_role";

grant update on table "public"."budget" to "service_role";

grant delete on table "public"."category" to "anon";

grant insert on table "public"."category" to "anon";

grant references on table "public"."category" to "anon";

grant select on table "public"."category" to "anon";

grant trigger on table "public"."category" to "anon";

grant truncate on table "public"."category" to "anon";

grant update on table "public"."category" to "anon";

grant delete on table "public"."category" to "authenticated";

grant insert on table "public"."category" to "authenticated";

grant references on table "public"."category" to "authenticated";

grant select on table "public"."category" to "authenticated";

grant trigger on table "public"."category" to "authenticated";

grant truncate on table "public"."category" to "authenticated";

grant update on table "public"."category" to "authenticated";

grant delete on table "public"."category" to "service_role";

grant insert on table "public"."category" to "service_role";

grant references on table "public"."category" to "service_role";

grant select on table "public"."category" to "service_role";

grant trigger on table "public"."category" to "service_role";

grant truncate on table "public"."category" to "service_role";

grant update on table "public"."category" to "service_role";

grant delete on table "public"."currency" to "anon";

grant insert on table "public"."currency" to "anon";

grant references on table "public"."currency" to "anon";

grant select on table "public"."currency" to "anon";

grant trigger on table "public"."currency" to "anon";

grant truncate on table "public"."currency" to "anon";

grant update on table "public"."currency" to "anon";

grant delete on table "public"."currency" to "authenticated";

grant insert on table "public"."currency" to "authenticated";

grant references on table "public"."currency" to "authenticated";

grant select on table "public"."currency" to "authenticated";

grant trigger on table "public"."currency" to "authenticated";

grant truncate on table "public"."currency" to "authenticated";

grant update on table "public"."currency" to "authenticated";

grant delete on table "public"."currency" to "service_role";

grant insert on table "public"."currency" to "service_role";

grant references on table "public"."currency" to "service_role";

grant select on table "public"."currency" to "service_role";

grant trigger on table "public"."currency" to "service_role";

grant truncate on table "public"."currency" to "service_role";

grant update on table "public"."currency" to "service_role";

grant delete on table "public"."transaction" to "anon";

grant insert on table "public"."transaction" to "anon";

grant references on table "public"."transaction" to "anon";

grant select on table "public"."transaction" to "anon";

grant trigger on table "public"."transaction" to "anon";

grant truncate on table "public"."transaction" to "anon";

grant update on table "public"."transaction" to "anon";

grant delete on table "public"."transaction" to "authenticated";

grant insert on table "public"."transaction" to "authenticated";

grant references on table "public"."transaction" to "authenticated";

grant select on table "public"."transaction" to "authenticated";

grant trigger on table "public"."transaction" to "authenticated";

grant truncate on table "public"."transaction" to "authenticated";

grant update on table "public"."transaction" to "authenticated";

grant delete on table "public"."transaction" to "service_role";

grant insert on table "public"."transaction" to "service_role";

grant references on table "public"."transaction" to "service_role";

grant select on table "public"."transaction" to "service_role";

grant trigger on table "public"."transaction" to "service_role";

grant truncate on table "public"."transaction" to "service_role";

grant update on table "public"."transaction" to "service_role";


