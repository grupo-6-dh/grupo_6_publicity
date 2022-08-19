-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-08-2022 a las 04:39:56
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `publicity`
--
CREATE DATABASE IF NOT EXISTS `publicity` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `publicity`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bag_colors`
--

CREATE TABLE `bag_colors` (
  `id` int(11) NOT NULL,
  `color` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `bag_colors`
--

INSERT INTO `bag_colors` (`id`, `color`) VALUES
(1, 'Negro'),
(2, 'Amarillo'),
(3, 'Beige'),
(4, 'Blanco'),
(5, 'Azul'),
(6, 'Verde'),
(7, 'Rojo'),
(8, 'Rosa'),
(9, 'Naranja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bag_sizes`
--

CREATE TABLE `bag_sizes` (
  `id` int(11) NOT NULL,
  `size` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `bag_sizes`
--

INSERT INTO `bag_sizes` (`id`, `size`) VALUES
(1, '35x40'),
(2, '40x50'),
(3, '40x60'),
(4, '25x40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `delivery` varchar(50) DEFAULT NULL,
  `deliveryAdress` varchar(200) DEFAULT NULL,
  `paymentMethod` varchar(200) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idStatus` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `image` varchar(400) DEFAULT NULL,
  `idSize` int(11) DEFAULT NULL,
  `idProductCategory` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `idSize`, `idProductCategory`) VALUES
(56, 'Bolsa Friselina', 'bolsa linda', 400, 'img/1660873224942-img.PNG', 3, 1),
(57, 'Bolsa Cristal', 'asddsds', 838, 'img/1660870927847-img.PNG', 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_carts`
--

CREATE TABLE `product_carts` (
  `id` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `idProduct` int(11) DEFAULT NULL,
  `idCart` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_categorys`
--

CREATE TABLE `product_categorys` (
  `id` int(11) NOT NULL,
  `productCategory` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product_categorys`
--

INSERT INTO `product_categorys` (`id`, `productCategory`) VALUES
(1, 'Bolsa Friselina'),
(2, 'Bolsa Plástica'),
(3, 'Bolsa Cristal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status_carts`
--

CREATE TABLE `status_carts` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stock`
--

CREATE TABLE `stock` (
  `id` int(11) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `idBagColor` int(11) DEFAULT NULL,
  `idProduct` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `stock`
--

INSERT INTO `stock` (`id`, `stock`, `idBagColor`, `idProduct`) VALUES
(69, 0, 8, 56),
(70, 0, 8, 56),
(71, 0, 8, 56),
(72, 0, 8, 56),
(73, 0, 8, 56),
(74, 4, 1, 57),
(75, 2, 4, 57),
(76, 2, 7, 57);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `idUserCategory` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `idUserCategory`) VALUES
(2, 'admin', 'admin@admin.com', '$2a$10$YBn6GYlk5jIphFfu2VKwGeA8ag31bM5qdFIEBrL/lZHlYHg9i2V6O', 2),
(4, 'Irina Mendez', 'irimende2016@gmail.com', '$2a$10$/GSJH15UaAiC.3vLQYlDYOWo2Keal3i4OnK1LY7uQcB49LpLWU0yu', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_categorys`
--

CREATE TABLE `user_categorys` (
  `id` int(11) NOT NULL,
  `userCategory` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_categorys`
--

INSERT INTO `user_categorys` (`id`, `userCategory`) VALUES
(1, 'normal'),
(2, 'admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bag_colors`
--
ALTER TABLE `bag_colors`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `bag_sizes`
--
ALTER TABLE `bag_sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idStatus` (`idStatus`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idSize` (`idSize`),
  ADD KEY `idProductCategory` (`idProductCategory`);

--
-- Indices de la tabla `product_carts`
--
ALTER TABLE `product_carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idProduct` (`idProduct`),
  ADD KEY `idCart` (`idCart`);

--
-- Indices de la tabla `product_categorys`
--
ALTER TABLE `product_categorys`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `status_carts`
--
ALTER TABLE `status_carts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idBagColor` (`idBagColor`),
  ADD KEY `idProduct` (`idProduct`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUserCategory` (`idUserCategory`);

--
-- Indices de la tabla `user_categorys`
--
ALTER TABLE `user_categorys`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bag_colors`
--
ALTER TABLE `bag_colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `bag_sizes`
--
ALTER TABLE `bag_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de la tabla `product_carts`
--
ALTER TABLE `product_carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `product_categorys`
--
ALTER TABLE `product_categorys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `status_carts`
--
ALTER TABLE `status_carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `user_categorys`
--
ALTER TABLE `user_categorys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`idStatus`) REFERENCES `status_carts` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`idSize`) REFERENCES `bag_sizes` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`idProductCategory`) REFERENCES `product_categorys` (`id`);

--
-- Filtros para la tabla `product_carts`
--
ALTER TABLE `product_carts`
  ADD CONSTRAINT `product_carts_ibfk_1` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_carts_ibfk_2` FOREIGN KEY (`idCart`) REFERENCES `carts` (`id`);

--
-- Filtros para la tabla `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`idBagColor`) REFERENCES `bag_colors` (`id`),
  ADD CONSTRAINT `stock_ibfk_2` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`idUserCategory`) REFERENCES `user_categorys` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
