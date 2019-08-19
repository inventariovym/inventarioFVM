CREATE TABLE Proveedor(
	nit 		int PRIMARY KEY NOT NULL ,
	nombreProv 	varchar(20) not null);
	
CREATE TABLE Factura(
	idFactura 		int not null primary key,
	nitP			int not null REFERENCES Proveedor(nit),
	valorTotal		float not null,
	fechaRegistro	date
);

CREATE TABLE Producto(
	codigoProd	int not null PRIMARY KEY,
	nombreProd	varchar(20),
	cantidadTot	int not null
);

CREATE TABLE Detalle(
	idFactura 		int not null REFERENCES Factura(idFactura),
	codigoProd		int not null REFERENCES Producto(codigoProd),
	cantComprada	int not null 
);

CREATE TABLE Plato(
	codigoPlato		int not null PRIMARY KEY,
	nombrePlato		varchar(20)
);

CREATE TABLE Formula(
	cantNece		float not null,
	codigoProd		int not null REFERENCES Producto(codigoProd),
	codigoPlato		int not null REFERENCES Plato(codigoPlato)
);

CREATE TABLE Registra(
	codTrans 	int not null PRIMARY KEY,
	cantComen	int not null,
	codigoPlato		int not null REFERENCES Plato(codigoPlato),
	codigoProd		int not null REFERENCES Producto(codigoProd)
);
