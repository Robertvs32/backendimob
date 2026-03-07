CREATE TABLE imoveis(
    id INT NOT NULL AUTO_INCREMENT,
    id_proprietario JSON NOT NULL,
    cep VARCHAR(12) NOT NULL,
    numero INT NOT NULL,
    complemento VARCHAR(255) DEFAULT(''),
    codigo_imovel VARCHAR(20),
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT pk_id_imoveis PRIMARY KEY (id)
);

CREATE TABLE empresas(
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100),
    cnpj VARCHAR(14),
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT pk_id_empresas PRIMARY KEY (id)
);

CREATE TABLE usuarios(
    id INT NOT NULL AUTO_INCREMENT,
    id_empresa INT NOT NULL,
    nome VARCHAR(50),
    email VARCHAR(100),
    password_hash VARCHAR(100),
    roles ENUM('adm', 'financeiro', 'corretor'),
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT pk_id_usuarios PRIMARY KEY (id),
    CONSTRAINT fk_id_empresa_usuarios FOREIGN KEY (id_empresa) REFERENCES empresas(id)
);

CREATE TABLE propostas_venda(
    id INT NOT NULL AUTO_INCREMENT,
    id_empresa INT NOT NULL,
    id_imovel INT NOT NULL,
    id_cliente JSON,
    info_corretores JSON,
    comissao DECIMAL(12, 2),
    detalhes_pagamento JSON,
    valor_proposta DECIMAL(12, 2),
    status ENUM('Aguardando documentos', 'Enviado para analise financiamento', 'Aguardando assinatura de contrato', 'Finalizado'),
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT pk_id_propostas PRIMARY KEY (id),
    CONSTRAINT fk_id_empresa_venda FOREIGN KEY (id_empresa) REFERENCES empresas(id),
    CONSTRAINT fk_id_imovel_venda FOREIGN KEY (id_imovel) REFERENCES imoveis(id)
);

CREATE TABLE propostas_locacao(
    id INT NOT NULL AUTO_INCREMENT,
    id_empresa INT NOT NULL,
    id_imovel INT NOT NULL,
    id_locatario JSON,
    regras JSON,
    quantidade_moradores INT NOT NULL,
    data_admissao DATE,
    valor_proposta DECIMAL(10,2),
    status ENUM('Aguardando documentos', 'Enviado para analise de credito', 'Aguardando assinatura de contrato', 'Finalizado'),
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT pk_id_locacao PRIMARY KEY (id),
    CONSTRAINT fk_id_empresa_locaco FOREIGN KEY (id_empresa) REFERENCES empresas(id),
    CONSTRAINT fk_id_imovel_locacao FOREIGN KEY (id_imovel) REFERENCES imoveis(id)
);

CREATE TABLE clientes(
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100),
    rg VARCHAR(20),
    cpf VARCHAR(20),
    renda_bruta DECIMAL(12,2) DEFAULT(0) NOT NULL,
    estado_civil ENUM('Solteiro(a)', 'Casado(a)', 'Viuvo(a)', 'Divorciado(a)') NOT NULL,
    telefone VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    id_empresa INT NOT NULL,
    cep VARCHAR(12),
    numero INT NOT NULL,
    profissao VARCHAR(80),
    link_doc VARCHAR(512) DEFAULT NULL,
    link_holerite VARCHAR(512) DEFAULT NULL,
    link_irpf VARCHAR(512) DEFAULT NULL,
    link_residencia VARCHAR(512) DEFAULT NULL,
    link_certidao VARCHAR(512) DEFAULT NULL,
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT pk_id_clientes PRIMARY KEY(id)
);