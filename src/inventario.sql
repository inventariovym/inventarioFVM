--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4
-- Dumped by pg_dump version 11.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: login; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login (
    id_usuario character varying NOT NULL,
    contrasenia character varying
);


ALTER TABLE public.login OWNER TO postgres;

--
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.login (id_usuario, contrasenia) FROM stdin;
VYM	$2a$10$A1GdSm6XcO.XXFcyxkn/qOph8pO8MCHBYlt.5uvpbcYARH/MxqxkK
vym	$2a$10$fyN0tYyji8j.iN5.UA684O9j.ztcBEbg6R9Agrjm.2TcTBlxlVBki
\.


--
-- Name: login login_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id_usuario);


--
-- PostgreSQL database dump complete
--

