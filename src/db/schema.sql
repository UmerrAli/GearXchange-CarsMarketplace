-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.car_images (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  car_id bigint NOT NULL,
  image_url text NOT NULL,
  is_primary boolean DEFAULT false,
  position smallint,
  created_at timestamp with time zone DEFAULT now(),
  user_id uuid DEFAULT auth.uid(),
  CONSTRAINT car_images_pkey PRIMARY KEY (id),
  CONSTRAINT car_images_car_fk FOREIGN KEY (car_id) REFERENCES public.cars(id)
);
CREATE TABLE public.cars (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  title text NOT NULL,
  make text NOT NULL,
  year integer,
  city text,
  price integer,
  features jsonb,
  description text,
  color text,
  mileage integer,
  created_at date,
  featured boolean DEFAULT false,
  model text,
  profile_id bigint,
  phone text,
  user_id uuid NOT NULL DEFAULT auth.uid(),
  CONSTRAINT cars_pkey PRIMARY KEY (id),
  CONSTRAINT cars_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.profiles (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  phone text,
  email text NOT NULL,
  user_id uuid NOT NULL DEFAULT auth.uid(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);