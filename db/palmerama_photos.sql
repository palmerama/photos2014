-- phpMyAdmin SQL Dump
-- version 3.5.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 22, 2014 at 03:35 PM
-- Server version: 5.5.29
-- PHP Version: 5.4.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `palmerama_photos`
--

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_id` varchar(30) NOT NULL,
  `title_display` varchar(256) NOT NULL,
  `title_alpha` float NOT NULL,
  `cover` tinyint(4) NOT NULL DEFAULT '0',
  `portrait` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `page_id`, `title_display`, `title_alpha`, `cover`, `portrait`) VALUES
(1, 'tofino', 'Tofino, Vancouver Island, at dusk. ', 0.2, 1, 0),
(2, 'bridge', 'Lion''s Gate Bridge, Vancouver.', 0.4, 0, 1),
(3, 'whale', 'Why hello there.', 0.3, 0, 0),
(4, 'whaletail', 'goodbye.', 0.3, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sequence`
--

CREATE TABLE `sequence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `sequence`
--

INSERT INTO `sequence` (`id`, `photo_id`) VALUES
(1, 3),
(2, 1),
(3, 2);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
