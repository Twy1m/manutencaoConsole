-- Script do banco db_pixelfix (PixelFix Games)
-- Os campos senha, cpf e numeroSerie estao criptografados (crypto-js AES, chave em backend/config.js).
-- Logins de teste: carlos@gmail.com / abc | ana@gmail.com / 123 | bruno@gmail.com / 456
-- Obs.: as tabelas tambem podem ser criadas pelo Sequelize (cd backend; node sync.js).

CREATE DATABASE IF NOT EXISTS db_pixelfix;
USE db_pixelfix;

DROP TABLE IF EXISTS agendamentos;
DROP TABLE IF EXISTS consoles;
DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes (
  codCliente INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,      -- criptografada
  cpf VARCHAR(255) NOT NULL,        -- criptografado
  telefone VARCHAR(20) NOT NULL,
  PRIMARY KEY (codCliente)
) ENGINE=InnoDB;

CREATE TABLE consoles (
  codConsole INT NOT NULL AUTO_INCREMENT,
  modelo VARCHAR(100) NOT NULL,
  marca VARCHAR(100) NOT NULL,
  numeroSerie VARCHAR(255) NOT NULL, -- criptografado
  servico VARCHAR(150) NOT NULL,
  idCliente INT NOT NULL,
  PRIMARY KEY (codConsole),
  FOREIGN KEY (idCliente) REFERENCES clientes (codCliente) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE agendamentos (
  codAgendamento INT NOT NULL AUTO_INCREMENT,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  idCliente INT NOT NULL,
  idConsole INT NOT NULL,
  PRIMARY KEY (codAgendamento),
  FOREIGN KEY (idCliente) REFERENCES clientes (codCliente) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (idConsole) REFERENCES consoles (codConsole) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

INSERT INTO `clientes` VALUES
(1,'Carlos Silva','carlos@gmail.com','U2FsdGVkX19/soFiC6IrkMbPfN/N2fYDuvgZT6uqmpY=','U2FsdGVkX18VaY1FiKNt+Lvq4+Woc3pc5VmUTQ/Oh9k=','47999990001'),
(2,'Ana Souza','ana@gmail.com','U2FsdGVkX18pDegwdorhGmHsKE2sVNbmAO3BbsRlQnA=','U2FsdGVkX1/sH13jqtqKvpqNM/RtbC/h4WgqeaK8lPQ=','47988880002'),
(3,'Bruno Lima','bruno@gmail.com','U2FsdGVkX1+Me+TrHjfipuW1lfd3LQS0rTZHRXA2uIg=','U2FsdGVkX1+zj2+ttD6gCUjAN6td+2kYuaV3xsGTmvY=','47977770003');

INSERT INTO `consoles` VALUES
(1,'PlayStation 5','Sony','U2FsdGVkX18aYrBrlQ3S/e+TloKwp1hjicnvVXdjJE8=','Troca de pasta térmica',1),
(2,'Nintendo Switch','Nintendo','U2FsdGVkX1/c0HV3u3hTMhARhqvFZOdyx1HZNafp6Gs=','Troca de joystick',2),
(3,'Xbox Series X','Microsoft','U2FsdGVkX18S0pMZhwBfDIp1NcsKPx1X/VL3T699P98=','Limpeza e manutenção preventiva',3);

INSERT INTO `agendamentos` VALUES
(1,'2026-11-10','09:00:00',1,1),
(2,'2026-11-12','14:30:00',2,2),
(3,'2026-11-15','10:00:00',3,3);
