--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.14
-- Dumped by pg_dump version 9.6.14

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

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: detalle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle (
    idfactura integer NOT NULL,
    codigoprod integer NOT NULL,
    cantcomprada integer NOT NULL
);


ALTER TABLE public.detalle OWNER TO postgres;

--
-- Name: factura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.factura (
    idfactura integer NOT NULL,
    nitp integer NOT NULL,
    valortotal money NOT NULL,
    fecharegistro date
);


ALTER TABLE public.factura OWNER TO postgres;

--
-- Name: factura_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.factura_id
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.factura_id OWNER TO postgres;

--
-- Name: factura_idfactura_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.factura_idfactura_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.factura_idfactura_seq OWNER TO postgres;

--
-- Name: factura_idfactura_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.factura_idfactura_seq OWNED BY public.factura.idfactura;


--
-- Name: formula; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.formula (
    cantnece double precision NOT NULL,
    medida character varying(10) NOT NULL,
    codigoprod integer NOT NULL,
    codigoplato integer NOT NULL
);


ALTER TABLE public.formula OWNER TO postgres;

--
-- Name: login; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login (
    id_usuario character varying(50) NOT NULL,
    contrasenia character varying(70)
);


ALTER TABLE public.login OWNER TO postgres;

--
-- Name: plato; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plato (
    codigoplato integer NOT NULL,
    nombreplato character varying(20)
);


ALTER TABLE public.plato OWNER TO postgres;

--
-- Name: plato_codigoplato_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plato_codigoplato_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.plato_codigoplato_seq OWNER TO postgres;

--
-- Name: plato_codigoplato_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plato_codigoplato_seq OWNED BY public.plato.codigoplato;


--
-- Name: plato_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plato_id
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.plato_id OWNER TO postgres;

--
-- Name: producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producto (
    codigoprod integer NOT NULL,
    nombreprod character varying(20),
    medida character varying(10),
    cantidadtot integer NOT NULL
);


ALTER TABLE public.producto OWNER TO postgres;

--
-- Name: producto_codigoprod_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.producto_codigoprod_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.producto_codigoprod_seq OWNER TO postgres;

--
-- Name: producto_codigoprod_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.producto_codigoprod_seq OWNED BY public.producto.codigoprod;


--
-- Name: producto_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.producto_id
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.producto_id OWNER TO postgres;

--
-- Name: proveedor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proveedor (
    nit integer NOT NULL,
    nombreprov character varying(20) NOT NULL
);


ALTER TABLE public.proveedor OWNER TO postgres;

--
-- Name: registra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.registra (
    codtrans integer NOT NULL,
    cantcomen integer NOT NULL,
    codigoplato integer NOT NULL,
    codigoprod integer NOT NULL
);


ALTER TABLE public.registra OWNER TO postgres;

--
-- Name: registra_codtrans_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.registra_codtrans_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registra_codtrans_seq OWNER TO postgres;

--
-- Name: registra_codtrans_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.registra_codtrans_seq OWNED BY public.registra.codtrans;


--
-- Name: registra_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.registra_id
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.registra_id OWNER TO postgres;

--
-- Name: factura idfactura; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura ALTER COLUMN idfactura SET DEFAULT nextval('public.factura_idfactura_seq'::regclass);


--
-- Name: plato codigoplato; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plato ALTER COLUMN codigoplato SET DEFAULT nextval('public.plato_codigoplato_seq'::regclass);


--
-- Name: producto codigoprod; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto ALTER COLUMN codigoprod SET DEFAULT nextval('public.producto_codigoprod_seq'::regclass);


--
-- Name: registra codtrans; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registra ALTER COLUMN codtrans SET DEFAULT nextval('public.registra_codtrans_seq'::regclass);


--
-- Data for Name: detalle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle (idfactura, codigoprod, cantcomprada) FROM stdin;
\.


--
-- Data for Name: factura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.factura (idfactura, nitp, valortotal, fecharegistro) FROM stdin;
\.


--
-- Name: factura_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.factura_id', 1000, true);


--
-- Name: factura_idfactura_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.factura_idfactura_seq', 1, false);


--
-- Data for Name: formula; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.formula (cantnece, medida, codigoprod, codigoplato) FROM stdin;
\.


--
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.login (id_usuario, contrasenia) FROM stdin;
VYM	$2a$10$/DpTVTvMjS0eB.Zq4xyBWuYpyV.ZesBfs8SUZhB0SY3f4yjBm.sb6
vym	$2a$10$IAFtlk3seukxGAnenNrLeOVQNwmQkQFc3OpACwlMiJFNASu2csZ6u
\.


--
-- Data for Name: plato; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plato (codigoplato, nombreplato) FROM stdin;
\.


--
-- Name: plato_codigoplato_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plato_codigoplato_seq', 1, false);


--
-- Name: plato_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plato_id', 1000, true);


--
-- Data for Name: producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.producto (codigoprod, nombreprod, medida, cantidadtot) FROM stdin;
1001	aceite	ml	3000
1002	huevo	und	60
1003	sol	g	500
1004	azucar	g	500
1005	leche	ml	5000
\.


--
-- Name: producto_codigoprod_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.producto_codigoprod_seq', 1, false);


--
-- Name: producto_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.producto_id', 1005, true);


--
-- Data for Name: proveedor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proveedor (nit, nombreprov) FROM stdin;
\.


--
-- Data for Name: registra; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.registra (codtrans, cantcomen, codigoplato, codigoprod) FROM stdin;
\.


--
-- Name: registra_codtrans_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.registra_codtrans_seq', 1, false);


--
-- Name: registra_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.registra_id', 1000, false);


--
-- Name: factura factura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_pkey PRIMARY KEY (idfactura);


--
-- Name: login login_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id_usuario);


--
-- Name: plato plato_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plato
    ADD CONSTRAINT plato_pkey PRIMARY KEY (codigoplato);


--
-- Name: producto producto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (codigoprod);


--
-- Name: proveedor proveedor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT proveedor_pkey PRIMARY KEY (nit);


--
-- Name: registra registra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registra
    ADD CONSTRAINT registra_pkey PRIMARY KEY (codtrans);


--
-- Name: detalle detalle_codigoprod_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle
    ADD CONSTRAINT detalle_codigoprod_fkey FOREIGN KEY (codigoprod) REFERENCES public.producto(codigoprod);


--
-- Name: detalle detalle_idfactura_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle
    ADD CONSTRAINT detalle_idfactura_fkey FOREIGN KEY (idfactura) REFERENCES public.factura(idfactura);


--
-- Name: factura factura_nitp_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_nitp_fkey FOREIGN KEY (nitp) REFERENCES public.proveedor(nit);


--
-- Name: formula formula_codigoplato_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formula
    ADD CONSTRAINT formula_codigoplato_fkey FOREIGN KEY (codigoplato) REFERENCES public.plato(codigoplato) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: formula formula_codigoprod_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formula
    ADD CONSTRAINT formula_codigoprod_fkey FOREIGN KEY (codigoprod) REFERENCES public.producto(codigoprod);


--
-- Name: registra registra_codigoplato_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registra
    ADD CONSTRAINT registra_codigoplato_fkey FOREIGN KEY (codigoplato) REFERENCES public.plato(codigoplato) ON UPDATE CASCADE;


--
-- Name: registra registra_codigoprod_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registra
    ADD CONSTRAINT registra_codigoprod_fkey FOREIGN KEY (codigoprod) REFERENCES public.producto(codigoprod);


--
-- PostgreSQL database dump complete
--

