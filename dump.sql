--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.25
-- Dumped by pg_dump version 9.5.25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.user_pairs DROP CONSTRAINT fk_user_taker;
ALTER TABLE ONLY public.groups DROP CONSTRAINT fk_user_group;
ALTER TABLE ONLY public.user_pairs DROP CONSTRAINT fk_user_giver;
ALTER TABLE ONLY public.group_users DROP CONSTRAINT fk_user;
ALTER TABLE ONLY public.user_pairs DROP CONSTRAINT fk_group;
ALTER TABLE ONLY public.group_users DROP CONSTRAINT fk_group;
DROP TRIGGER on_update_timestamp ON public.users;
DROP TRIGGER on_update_timestamp ON public.groups;
DROP TRIGGER on_insert_group ON public.groups;
DROP INDEX public."IDX_session_expire";
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
ALTER TABLE ONLY public.user_pairs DROP CONSTRAINT taker_pair_constraint;
ALTER TABLE ONLY public.sessions DROP CONSTRAINT session_pkey;
ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pk;
ALTER TABLE ONLY public.group_users DROP CONSTRAINT group_user_constraint;
ALTER TABLE ONLY public.user_pairs DROP CONSTRAINT giver_pair_constraint;
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.groups ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP TABLE public.user_pairs;
DROP TABLE public.sessions;
DROP SEQUENCE public.groups_id_seq;
DROP TABLE public.groups;
DROP TABLE public.group_users;
DROP FUNCTION public.update_timestamp_column();
DROP FUNCTION public.create_group_user_relation();
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


-- ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: create_group_user_relation(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_group_user_relation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    INSERT INTO group_users (group_id, user_id) VALUES (NEW.id, NEW.owner_id);

    RETURN NEW;

END;
$$;


-- ALTER FUNCTION public.create_group_user_relation() OWNER TO postgres;

--
-- Name: update_timestamp_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_timestamp_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.updated_at = CURRENT_TIMESTAMP;

    RETURN NEW;

END;
$$;


-- ALTER FUNCTION public.update_timestamp_column() OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: group_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.group_users (
    group_id integer NOT NULL,
    user_id integer NOT NULL
);


-- ALTER TABLE public.group_users OWNER TO postgres;

--
-- Name: groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.groups (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    owner_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    is_closed boolean DEFAULT false NOT NULL,
    uid character varying(255) NOT NULL
);


-- ALTER TABLE public.groups OWNER TO postgres;

--
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.groups_id_seq OWNER TO postgres;

--
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


-- ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: user_pairs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_pairs (
    group_id integer NOT NULL,
    user_giver_id integer NOT NULL,
    user_taker_id integer NOT NULL
);


-- ALTER TABLE public.user_pairs OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(255) DEFAULT ''::bpchar NOT NULL,
    role character varying(255) DEFAULT 'user'::bpchar NOT NULL,
    otp text DEFAULT NULL::bpchar,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    email_confirmed boolean DEFAULT false NOT NULL,
    avatar character varying(255) DEFAULT '😀'::bpchar NOT NULL,
    item_like character varying(255) DEFAULT '❓'::bpchar NOT NULL,
    item_dislike character varying(255) DEFAULT '❓'::bpchar NOT NULL
);


-- ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups ALTER COLUMN id SET DEFAULT nextval('public.groups_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: giver_pair_constraint; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_pairs
    ADD CONSTRAINT giver_pair_constraint UNIQUE (group_id, user_giver_id);


--
-- Name: group_user_constraint; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_users
    ADD CONSTRAINT group_user_constraint UNIQUE (group_id, user_id);


--
-- Name: groups_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pk PRIMARY KEY (id);


--
-- Name: session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: taker_pair_constraint; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_pairs
    ADD CONSTRAINT taker_pair_constraint UNIQUE (group_id, user_taker_id);


--
-- Name: users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON public.sessions USING btree (expire);


--
-- Name: on_insert_group; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER on_insert_group AFTER INSERT ON public.groups FOR EACH ROW EXECUTE PROCEDURE public.create_group_user_relation();


--
-- Name: on_update_timestamp; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER on_update_timestamp BEFORE UPDATE ON public.groups FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp_column();


--
-- Name: on_update_timestamp; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER on_update_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp_column();


--
-- Name: fk_group; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_users
    ADD CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE;


--
-- Name: fk_group; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_pairs
    ADD CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE;


--
-- Name: fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_users
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: fk_user_giver; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_pairs
    ADD CONSTRAINT fk_user_giver FOREIGN KEY (user_giver_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: fk_user_group; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT fk_user_group FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: fk_user_taker; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_pairs
    ADD CONSTRAINT fk_user_taker FOREIGN KEY (user_taker_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

-- REVOKE ALL ON SCHEMA public FROM PUBLIC;
-- REVOKE ALL ON SCHEMA public FROM postgres;
-- GRANT ALL ON SCHEMA public TO postgres;
-- GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

