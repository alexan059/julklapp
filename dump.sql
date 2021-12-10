PGDMP  	                
        y            julklapp    14.1 (Debian 14.1-1.pgdg110+1)    14.1 (Debian 14.1-1.pgdg110+1) "    %           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            &           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            '           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            (           1262    16384    julklapp    DATABASE     \   CREATE DATABASE julklapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
    DROP DATABASE julklapp;
                postgres    false            �            1255    16472    create_group_user_relation()    FUNCTION     �   CREATE FUNCTION public.create_group_user_relation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    INSERT INTO group_users (group_id, user_id) VALUES (NEW.id, NEW.owner_id);

    RETURN NEW;

END;
$$;
 3   DROP FUNCTION public.create_group_user_relation();
       public          postgres    false            �            1255    16473    update_timestamp_column()    FUNCTION     �   CREATE FUNCTION public.update_timestamp_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.updated_at = CURRENT_TIMESTAMP;

    RETURN NEW;

END;
$$;
 0   DROP FUNCTION public.update_timestamp_column();
       public          postgres    false            �            1259    16474    group_users    TABLE     a   CREATE TABLE public.group_users (
    group_id integer NOT NULL,
    user_id integer NOT NULL
);
    DROP TABLE public.group_users;
       public         heap    postgres    false            �            1259    16477    groups    TABLE     �  CREATE TABLE public.groups (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    owner_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_closed boolean DEFAULT false NOT NULL,
    uid character varying(255) NOT NULL
);
    DROP TABLE public.groups;
       public         heap    postgres    false            �            1259    16485    groups_id_seq    SEQUENCE     �   CREATE SEQUENCE public.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.groups_id_seq;
       public          postgres    false    210            )           0    0    groups_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.id;
          public          postgres    false    211            �            1259    16486    sessions    TABLE     �   CREATE TABLE public.sessions (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);
    DROP TABLE public.sessions;
       public         heap    postgres    false            �            1259    16491 
   user_pairs    TABLE     �   CREATE TABLE public.user_pairs (
    group_id integer NOT NULL,
    user_giver_id integer NOT NULL,
    user_taker_id integer NOT NULL
);
    DROP TABLE public.user_pairs;
       public         heap    postgres    false            �            1259    16494    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(255) DEFAULT ''::bpchar NOT NULL,
    role character varying(255) DEFAULT 'user'::bpchar NOT NULL,
    otp text DEFAULT NULL::bpchar,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    email_confirmed boolean DEFAULT false NOT NULL,
    avatar character varying(255) DEFAULT '😀'::bpchar NOT NULL,
    item_like character varying(255) DEFAULT '❓'::bpchar NOT NULL,
    item_dislike character varying(255) DEFAULT '❓'::bpchar NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16508    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    214            *           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            u           2604    16509 	   groups id    DEFAULT     f   ALTER TABLE ONLY public.groups ALTER COLUMN id SET DEFAULT nextval('public.groups_id_seq'::regclass);
 8   ALTER TABLE public.groups ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210                       2604    16510    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214            �           2606    16512     user_pairs giver_pair_constraint 
   CONSTRAINT     n   ALTER TABLE ONLY public.user_pairs
    ADD CONSTRAINT giver_pair_constraint UNIQUE (group_id, user_giver_id);
 J   ALTER TABLE ONLY public.user_pairs DROP CONSTRAINT giver_pair_constraint;
       public            postgres    false    213    213            �           2606    16514 !   group_users group_user_constraint 
   CONSTRAINT     i   ALTER TABLE ONLY public.group_users
    ADD CONSTRAINT group_user_constraint UNIQUE (group_id, user_id);
 K   ALTER TABLE ONLY public.group_users DROP CONSTRAINT group_user_constraint;
       public            postgres    false    209    209            �           2606    16516    groups groups_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pk;
       public            postgres    false    210            �           2606    16518    sessions session_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);
 ?   ALTER TABLE ONLY public.sessions DROP CONSTRAINT session_pkey;
       public            postgres    false    212            �           2606    16520     user_pairs taker_pair_constraint 
   CONSTRAINT     n   ALTER TABLE ONLY public.user_pairs
    ADD CONSTRAINT taker_pair_constraint UNIQUE (group_id, user_taker_id);
 J   ALTER TABLE ONLY public.user_pairs DROP CONSTRAINT taker_pair_constraint;
       public            postgres    false    213    213            �           2606    16522    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    214            �           2606    16524    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    214            �           1259    16525    IDX_session_expire    INDEX     K   CREATE INDEX "IDX_session_expire" ON public.sessions USING btree (expire);
 (   DROP INDEX public."IDX_session_expire";
       public            postgres    false    212            �           2620    16526    groups on_insert_group    TRIGGER     �   CREATE TRIGGER on_insert_group AFTER INSERT ON public.groups FOR EACH ROW EXECUTE FUNCTION public.create_group_user_relation();
 /   DROP TRIGGER on_insert_group ON public.groups;
       public          postgres    false    210    216            �           2620    16527    groups on_update_timestamp    TRIGGER     �   CREATE TRIGGER on_update_timestamp BEFORE UPDATE ON public.groups FOR EACH ROW EXECUTE FUNCTION public.update_timestamp_column();
 3   DROP TRIGGER on_update_timestamp ON public.groups;
       public          postgres    false    217    210            �           2620    16528    users on_update_timestamp    TRIGGER     �   CREATE TRIGGER on_update_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_timestamp_column();
 2   DROP TRIGGER on_update_timestamp ON public.users;
       public          postgres    false    217    214            �           2606    16529    group_users fk_group    FK CONSTRAINT     �   ALTER TABLE ONLY public.group_users
    ADD CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE;
 >   ALTER TABLE ONLY public.group_users DROP CONSTRAINT fk_group;
       public          postgres    false    209    3203    210            �           2606    16534    user_pairs fk_group    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_pairs
    ADD CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE;
 =   ALTER TABLE ONLY public.user_pairs DROP CONSTRAINT fk_group;
       public          postgres    false    3203    213    210            �           2606    16539    group_users fk_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.group_users
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 =   ALTER TABLE ONLY public.group_users DROP CONSTRAINT fk_user;
       public          postgres    false    214    209    3214            �           2606    16544    user_pairs fk_user_giver    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_pairs
    ADD CONSTRAINT fk_user_giver FOREIGN KEY (user_giver_id) REFERENCES public.users(id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.user_pairs DROP CONSTRAINT fk_user_giver;
       public          postgres    false    214    213    3214            �           2606    16549    groups fk_user_group    FK CONSTRAINT     �   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT fk_user_group FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE CASCADE;
 >   ALTER TABLE ONLY public.groups DROP CONSTRAINT fk_user_group;
       public          postgres    false    3214    210    214            �           2606    16554    user_pairs fk_user_taker    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_pairs
    ADD CONSTRAINT fk_user_taker FOREIGN KEY (user_taker_id) REFERENCES public.users(id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.user_pairs DROP CONSTRAINT fk_user_taker;
       public          postgres    false    213    3214    214           