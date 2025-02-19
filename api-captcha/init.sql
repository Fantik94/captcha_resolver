-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql
-- Généré le : mer. 19 fév. 2025 à 09:45
-- Version du serveur : 8.0.40
-- Version de PHP : 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `captcha_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `captchas_bruite`
--

CREATE TABLE `captchas_bruite` (
  `id` int NOT NULL,
  `image_url` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `value` varchar(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `type` enum('bruite','segmented') NOT NULL DEFAULT 'bruite'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `captchas_bruite`
--

INSERT INTO `captchas_bruite` (`id`, `image_url`, `value`, `created_at`, `type`) VALUES
(1, 'https://storage.googleapis.com/kagglesdsdata/datasets/1499294/2477380/Large_Captcha_Dataset/0003N.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200843Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=54be28596d3c27c21ab36b453404743216473ee99eb5e9d6020c79b58b26ef491d2ed5dfd886e2052eda027b9033b17c597b6677e766aa88e07e79c3d19f3f6d82fa632c32665b002987473a732ba56e8d68ad837de7925a9bb179496cffdc5e9692c2992c095752b562b7f07b20819742fe7d5315304a99d4185eb50d73c052c5d1bcd3ef9446bb2a818f82dff55fdff824d7e5064c6d660daaefff05e38fb0b59d69d18352848175aebd7a3028937d29a9d5baa00b83aa3b34afc88afb08615330ce17b8fab329438d2cc10e29983d84f3e51f483e902742312f2c409e11c36f581d7ce027fbf4d11ca8c641f9be88a12bab1fee52af5fee1e5d861ace156c', '0003N', '2025-02-18 20:03:34', 'bruite'),
(2, 'https://storage.googleapis.com/kagglesdsdata/datasets/1499294/2477380/Large_Captcha_Dataset/0003U.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200632Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=264a380fddfbe8ac71606623bdf09fea6157d9bbcd909f54160e1a564d08d5d01435ba805096ec751bb516892770df28cfa22d78bdd9fecc98f40714359302adceb26fa07efc5afef69c6e116ae6ae77f706d88ea97e0ee0dbc958f403185a63fa7ec3b026c8051c0f89509c27c9304d3dd7fe5bb5df9dedfb32d281e5a3317ed41a23717753ef08a147cd041d50d25d705c3f5f8bdbdddc2c101688dc0a2a3310f4e3e909931629656623a3f81ae6509e05664fd056ff050a5c7925697e8fa700c029e494e1a0c91a11c4d7f575d71e9e5b935f0473eabdce183015b787a4568c833965b075e8bb1c147ac3d19d104a68de68932f236f45856765f36aa040e1', '0003u', '2025-02-18 20:03:34', 'bruite'),
(3, 'https://storage.googleapis.com/kagglesdsdata/datasets/1499294/2477380/Large_Captcha_Dataset/0003a.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200632Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=04b84b93dcec02c40a93285159b0123c1a15419b578d05ffdc92dd920870b6aa7d7725cc26c7741b1dbf070a25834114b238736cf302d5635d97aaa1031df8ee2ba99531202cfdef7403b195af5199ab6723b8f3cc9fe6fe2df5dbc957680ea85ccc60ab8dde928ee729a650dec10074f5086e2f6dea22f48423ff760075ca510de9819707f8cac54029731708606c03b033b49c58d733c344dfd06dfc11aa7cc0e2888c1ddb0eff2a21c4d5265d3e2363d373723a095bbedb17c2759841366cd401a703eb50dcf466b72fde1dd4bcfffc17a6cc1001faf96de09965899c489779ac1566b8b7f36c9a3baecdd85a9bf4494ddb2c2ac55a9a110daefde4a68ac9', '0003a', '2025-02-18 20:29:45', 'bruite'),
(4, 'https://storage.googleapis.com/kagglesdsdata/datasets/1499294/2477380/Large_Captcha_Dataset/00084.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200632Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=176f0ebc05898d00c55a6202543c9ce1e910028634695d8c9c4847822bd936bfa270600eced2aed120853ef81e346266bab872716922d3cbacb472c7d02c4cf3aa75a1c0717f4e57d0a03c18b0be5b281bfe11558a3f160e65e7046baed6d7162a1ab08026634264bce969aa973958e67deab5db8c29404b33d80fcba3841add4518f00c050da7a30846fe1ecf57fd49516eccb90c4747dab02299aac83d62b9605ebd08193ca48614d12cf3414109864d7c7af89ffe33b64947967c82aba7550ef8b5769a6086f3ca3d9e377baa2923fc3d370526e972bc53a6a9fd2255620e93f64aba01d5171a6578feda3a67395f3e35a6d212ad91f757a45e46bce9e5c8', '00084', '2025-02-18 20:30:17', 'bruite'),
(7, 'https://storage.googleapis.com/kagglesdsdata/datasets/1499294/2477380/Large_Captcha_Dataset/000AQ.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200632Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=0c7fafd8b6bb5ebb8fe876fe73eb632eed2b697f2c299987fc62dc9278b25cd57dfaf0ed423511997fa7efb9759b3dca858a188ed0b6098ce567a99546a03220d5c2f7cc929127567a8fe9424790c9fe006f5ce1ca6244c25faf03b6d5b9632a3524a6ab95e06b9640c526e2dbda98e0dc0e0c356e85264156f4e2fa129c0e847e708a344d05b83fcaf28860212575320656907067cc3fa1bd771f858dbd47a786d18e56c8af44b7e3ce57c646acac1364d22f943dfe7923736fecf4efafd09906682faa0459391115dfbf0cfcd8aa940552a82c831265ac18f812c28e6922ff419c237f6f265d3d06acf57c500a4d3694414d39f8d7b1d045ab951d246bcc4e', '000AQ', '2025-02-18 20:30:42', 'bruite'),
(8, 'https://storage.googleapis.com/kagglesdsdata/datasets/1499294/2477380/Large_Captcha_Dataset/000HU.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200632Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=0a2b7b14ffec65379e3f06af814919c5485ad1398625488a55e9ffabd2f337a17aa905879789cc46e110170097da8b2763dad3d236d7fcfed6751a5f147dfc0564715482e6c8ef26e973b65763ae31039cf4c8edd23855b1dc61d17497060ad6d0a78e48ff228445e1290667e50040d19285c4bc1af7c20427b9d47cba9310f1042d269425b3d9c80687d97753125636b9484de9f41a2e684777f0f7c8424bda7741ba9452b9a74940ec2cb91b6bf0df6088e40886733191eb31539c041988cb959de6de04bd2f64055915ab4561ed767871a98b02858062e0dbfd04f87a5477c005e92bb4bfaa077ba70be468716ec61a4c9d0f8f53bc3f271ba049e733b0dc', '000HU', '2025-02-18 20:31:31', 'bruite'),
(9, 'https://storage.googleapis.com/kagglesdsdata/datasets/1499294/2477380/Large_Captcha_Dataset/000Oo.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200632Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=3d7d9d478f2422f347e3e5cc2f8f9369a0b90a1b205915bcebd71dcb31988f863c705219e74b847e5dc5498fc30004996e21ba2b4d0bbd97666f8f49139e08d12a43c4141164c1f695bfdc0a5c7c170dfd2354a4f31daefbb671a12c9be4d7aa9b5388aab46a8005226ead274e072a2c02b5780bffefed14e157d50b4c82267523865375def339f9edb543cab92625920a0359565ea55afcb23c8006666c97b22b67f2ab35e2d23352d0daff8a205bfb0750d376dc8fed4a2461bb33bd79ac39ed680a8d0a9258f0c999de63ea34f4addcdf4b3bccb251a2b15a12ffb022ba7f5279e72361b2198b5956898887bcdddbbd80610b64728251fdfa8be5cf1ca137', '000Oo', '2025-02-18 20:31:56', 'bruite'),
(10, 'https://storage.googleapis.com/kagglesdsdata/datasets/1499294/2477380/Large_Captcha_Dataset/000Si.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200632Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=252c71fed6389e11da86a1638e2cad2f045b0d5d28aebbd83516c6169ce22dfad6a7f8b275b4f137f9317ffbfb80fd869bc986de006bde44eaa50c6309602dbdbb2fa8c3d35a1536911b384ca55d51ec173a7b1e258e473cd1ae130b163035d5e2f11c914e40732263c5a1d6ddd58e85e289ff1551354b9cb3168c1b8fbd0d290103ec06a42142814a8067c8f1f978a42db67de9d454343f5de159b5055cfa059a4d052002b1805139535df4f5e0cb19b22d24be3732f7a4a913a385d2d270c21b38c238f856215d13abcdd6d58d33c3d3cb60c7d05d791ebb3dbd22f7acd91145219c6fc3c90a9034d7c4b38e295004f0dffaeefcd621a8ca9b87811e302285', '000Si', '2025-02-18 20:32:10', 'bruite'),
(11, 'https://storage.googleapis.com/kagglesdsdata/datasets/1499294/2477380/Large_Captcha_Dataset/000T6.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200632Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=1be5e0e43a16764c42b8d1541cf817f537f54798d1ce83ca175862a82ec46d90c1a5e314d50bd485c6ecad6f6040fd2c73f06179c78429d7e28471a207b6aff93c21ce0762139c789d94f5f32cd50f14a06da0a1bc669168a8c48bae434ab3026eb37d6e462e76cd4cccec89fb00a776d1c23d31d8e2a6f717ecd0cbae00857fd9e7d9d97351d2b63071e741f363ba8fe648453797dd1928ab442e10eba8e7706a960db05da5f536531323bd4a82df9ff161a3a19eff7ce1d16d0ddfd51d8dbca8ce4f655401b4bfd0bbd96ad4a0ff0597b0bbaa95e2357501a8b5ee53921a9f7ca0ac251a1f7fbbf3c0336d5d0051c2895a853ae31fde0ad885d6e183cd71b9', '000T6', '2025-02-18 20:32:21', 'bruite'),
(12, 'https://storage.googleapis.com/kagglesdsdata/datasets/1499294/2477380/Large_Captcha_Dataset/000V7.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200632Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=0b8aefa80285caec3311b49855af05e1473285facda31145b7c3be6a494a73b4f0cf3a30de1a87ab8b710cff972ea18fb01025d8777cc36b8f18b11a16f2812d3bfcf74b2518a47695f4f20392bab6c7bdc89ae09dce69a0007b934e224804225c331fd44c4cadf9e095475775138722c83b013e44702745c80baebf6a6790886defd8236e6cf4444db8e51318f1ef1aa0a47973d961bd5b19a3779328028f4845bf0ec54898c45231d73ca6c45de9f30e55e7c66e9227c8d260af6908c3650ca5d69da2c05829eac735e1ac4c5133947f4930732c3a94481fbc8385eb19cffcc7802293b9e5221d754bb9d652b0f63a157149d8e091352e1995662c4acb9d31', '000V7', '2025-02-18 20:32:38', 'bruite');

-- --------------------------------------------------------

--
-- Structure de la table `captchas_segmented`
--

CREATE TABLE `captchas_segmented` (
  `id` int NOT NULL,
  `image_url` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `value` varchar(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `type` enum('bruite','segmented') NOT NULL DEFAULT 'segmented'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `captchas_segmented`
--

INSERT INTO `captchas_segmented` (`id`, `image_url`, `value`, `created_at`, `type`) VALUES
(3, 'https://storage.googleapis.com/kagglesdsdata/datasets/3491375/6121992/testset/2AK279.jpeg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200733Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=2866efab39569f25a6f3b645bbf773f06d7b9074de9bc06695bced1234f338c3e5e181f4b91e7352f73df98a73dc124bfaafa89c57a72a72cc974faedc1531cf439b71269aa0f047ecaabaead939b8698fa31becbcffd824bbda9f6bda889169dc7820f9a5645b9f0b42c932e509fefb53808d642ad4ab1bbd9c3a7f3668fff8f86ac2618b92e69feb21f284a46cb2eb6eeec8346dc18f89c5762e3e1741c1201bc51d9517736f4b99e1cef607a32c7975619edd2ba2569b219a506eb83c79642dbdbdc2da182bf84043403b9ad810269fa8c4cfcd5787b1652c4ef5e82991e28039e3cfac8fea3455adadc4ad8682d301bb68bf93a6a113b8eb59a4d647ab55', '2AF279', '2025-02-18 20:34:13', 'segmented'),
(4, 'https://storage.googleapis.com/kagglesdsdata/datasets/3491375/6121992/testset/2CJ763.jpeg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200733Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=3f6951b540c7cbd3ab5a8a8a5f27506ce35d7737d91489ba476353d4b2a5a4c590643b6d6fc1d73059baf67e84720eb707943d3dffe65fd486581ed7fe7a5bf033bec7c67f7065eacf087960597727e335bf7f5298cb6479d369909e5ed92cadb05fa3e856f61833245bc3de84e453fa9267a54f8789c34e684a6f2c0cd3b83f6e0610b170936703bd4f767562faaabe4c92f8390f32762b7e9effc10dc28c99f28aa0abc740b740c0b1712b4054f46afff7f77e04f60dbe3e111612a66be5e1bfb0d4ac846bb3790da41e49ff3576bf6a5193b7763c7a435abfc6f07de5686560a3fd010ced2eec6c4137e75a989466724a8a30d14a92b2ec246e491b516fe5', '2CJ763', '2025-02-18 20:34:25', 'segmented'),
(5, 'https://storage.googleapis.com/kagglesdsdata/datasets/3491375/6121992/testset/2DD7MJ.jpeg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200733Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=81fca138f8db109f71d018ab26896cf8fc676adcc73bfb6946da812991ac6ad69c0f8612c491163a527c7197e4e7758a20b0e2cf549c3d3383bf9aa2fa54b63803c349fbc33141615b7d7069d8411bdf5ae5a77d1bf6cdfe08d997ecfa45b7c8bfb41843c7d3321e5374dfc0e6fc03d90959797cb5e10e5c12f55882919920cd0a37b67f19691cbaa9912ecd924cc0442a0ad842feb4cea1f7ef996032aa8e9367390b97b6a940cbd9fb5495500944b609afd75b24229f7c3a3df337d990564c7c43a1ec2192875d1beff7eba9af6c5dc3a9197c28ba4a6de5be4e5b335618e80857711e12e7da9f79f67dabff7923f7e27c0852b2dd4bf58746136d2bc2ef4d', '2DD7MJ', '2025-02-18 20:34:41', 'segmented'),
(6, 'https://storage.googleapis.com/kagglesdsdata/datasets/3491375/6121992/testset/2DG53S.jpeg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200733Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=a119727c57b6d7b47a33cce9e2c3f2b7eae437f0a4e0f77382445e975e61e704e938ffe9ac6e79a4cc4644473edfaed4600e7061875dfd2c77e62439a3ca28ce6934a2290298067797e4c750d9e920a0b039791e0d95a7deb1928741c74c67b54aa46065bb0571b4513bba66b06756fcb82293605ca1545b54042cb9d7faef6f98f18c86ba9d9a460453940e07d3815fd836c9f99a0c21b03fc1ac6e6ecffd5d3322bf7f2f481ea603233d282a87f94d8f6bf2715c90b358575595dff067ba5059da3a6787bb2622354e8fb96766d374c44e6391433580cbdd78b0314366a883f8a88629fc4c081efc4748f786391cf7f0e4eaac6baf7fe5e1d2fb0eb2f6e1de', '2DG53S', '2025-02-18 20:34:57', 'segmented'),
(7, 'https://storage.googleapis.com/kagglesdsdata/datasets/3491375/6121992/testset/2DWW6A.jpeg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200733Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=6de5b6bdde48350cca0f901a3de8e15b0d335e2a1bb6550c476591459f06d833a21a55795eb7c477fd1c24adbba08afddb3056e264bd9790182fa1e212d56ad93845ca038e81776a7a8739b2d324f521a3d49f1f6ec8e98d50d9992ae95e57aa3afa7ecfaefa2a99c0e3de72f71bac2d2ec987e7e625fae3fa2974f022c1da0437b8135e5e12f99324e77dd64e2e87fd76cb5dd087530b60f4b83d63dcc80ce829afc956ec1833122170eec2cfacecb55201516aff5e9b40980f814d46a0feca2651e1220fd106e5d15396a2f151e00b9bde51327d466a8524f5e69dbfec7ea170ae13c670d75dde92271b4f1c62f634fdcba3c63ae6c025a8688ee6e3aefc8f', '2DWW6A', '2025-02-18 20:35:13', 'segmented'),
(8, 'https://storage.googleapis.com/kagglesdsdata/datasets/3491375/6121992/testset/2DZ7MW.jpeg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200733Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=3c85eaf9c99437ba9cf60029a57f7465a0ee31ad1e228ac8f0fea36a0dc29f1b2e3f80142d6a3a5c202c6bb0801d2c5f44de9eb2b7ec72c57bc64f19c1ab6aa76fbbd5a941022575ec8142bb307ffc1fbaa946e90d0c8bcbce82a44e193e1ec1c638005f71787a414a5a6d08013ce08358d1ad1e8c7317d35fc5148793cbd9d95971e608f1783a00e7739c0cb8fa2925a9eea07ee82a42992d6eec479e7102a26e2e3baee84797567e19ca205949e7faeb93496f7518311cc7e1a0032a04f3daaeeadf09479e6f834754d224f7c192dce14052865f7ae2039e24a03904f8b29e3c78cb521f9509f65ef3338231a202e02d048a5e02c4ad25c38e4560ce9f4af6', '2DZ7MW', '2025-02-18 20:35:32', 'segmented'),
(9, 'https://storage.googleapis.com/kagglesdsdata/datasets/3491375/6121992/testset/2EP299.jpeg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200733Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=12e96aca3216aa3e254ebe1b28007eae33c649be85ab64f4f2a80f13480f042c834b9d149237139975043094f08da6440a85cfeb0beb88645d44fe0853e81c9bcee1c54efdf8b7cce5ebaa0591db838f560af9424b782eb19e22bd6b9d7c7870dde622735604ddd64833259ac652f24bd18dde68844cf2b67126ab93c529b0ea40c5f00a0506f4a8e8fe3bbbdaa6274902817c118c0927a60c80d59d40feccb43f014863a648d6e8c9d41d6cbafe4aed1fd8ec3fb7ee64da538c3b6e96c7e7b5e57bd603b2c07a8904743ac76ca3aa4336561608e16ffc5bee7357098612ccd4fcd82e15ae478a9304c5dc2436b188411e494f1a5d312b8123794ace603f7058', '2EP299', '2025-02-18 20:36:10', 'segmented'),
(10, 'https://storage.googleapis.com/kagglesdsdata/datasets/3491375/6121992/testset/2FV39D.jpeg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200733Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=16d860a54543969eae0a5f46d51a8a4c446bb01efa4b567fa0d068490f2f392ce2f274c8fbf25030c8bcf3c57b0d1bd41d87d8944e7ed33e62553099afc412606efcc33f987571a3f9970c50e2409babaa2e6f70b51052f5bee48f78a345ff16370c906d67372478992c214f09334f19e63093e491a812a11453d112682ec92c14de58abff65fde55e0a8a9b486505f7424413cc311283d4bf8dd589f9ce5c03f443cf126bcbb5f6edc584a5024cec782c406f005f47f95e76c522dde51bba8dbb91b5232ff372abb2f0a08a0fe217d3f066d9d93aaec15c2bca5e40f6f06ab090d9a6e719519545e5ac89141c374479a2d5b840001abdf204c2327e9e50b44c', '2FV39D', '2025-02-18 20:36:27', 'segmented'),
(11, 'https://storage.googleapis.com/kagglesdsdata/datasets/3491375/6121992/testset/2FW97C.jpeg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200733Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=230357918c812dd15f8620514180a388975673603aad3e908fbdcc0c871ad2332daa7555e6a14bf59cc248199391642be473e54f34505dd6850a9ba9872d1b2cb094f1d6972c1d36731725bc4875284e11ff87733b51ce5160252c92a207f30626e942906d0f1e5be3595c86a2e8747f0486af79d4ede0d68127f0b9144917720777114ba5ecc5bbafb5b80c5ac1f5cd3dd9b0bd2e5076b6e1a7578ef78929997bfaf5ec02eb12d5e9ba5a7fb997619711e8ea8532507069e9c433fd182a59086646f3d341b9a20e496a2c3e7f8d126211f75064378e25602994fd53310f7183a566132353ae5dc382473ff7f68bc13cc91f4279655173e8ae588987221dfafe', '2FW97C', '2025-02-18 20:36:45', 'segmented'),
(12, 'https://storage.googleapis.com/kagglesdsdata/datasets/3491375/6121992/testset/2H24TY.jpeg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250218%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250218T200733Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=b090e8a9c9b127a7cabac82ce660663d7330925b0b1571a15348514f4b498d6d9fd4041269731908bec89bd25560a22aa696b70ee08c657e65cd63deec608fcd8009afc9de660431383a3271fb25e0b574f130c57f62bf65bb6fb390378e11d6bf34d910f67cb6e938c42abe30e5fc7f358c92e1065434f218affe02eb5e8e91b0b3ab400e4ff89e2aaa6bc9197a85ff407f536f916ee69b26b2e8211059ba656df401883a7048b1580d750d681844fe8dcecf94eb685b98a4869cd7c6cc6e3963efdac08f2d818fb2d948212df47d95f5d776beef8e052aa66d4b9d1927ec033985f5e51aead3b61818487d525041b38f6b3de35148941db1981f8b9d91c82e', '2H24TY', '2025-02-18 20:36:56', 'segmented');

-- --------------------------------------------------------

--
-- Structure de la table `captcha_verifications`
--

CREATE TABLE `captcha_verifications` (
  `id` int NOT NULL,
  `captcha_id` int NOT NULL,
  `captcha_type` enum('bruite','segmented') NOT NULL,
  `received_value` varchar(10) DEFAULT NULL,
  `status` enum('pending','verified','failed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `captcha_verifications`
--

INSERT INTO `captcha_verifications` (`id`, `captcha_id`, `captcha_type`, `received_value`, `status`, `created_at`) VALUES
(2, 9, 'bruite', 'zzz', 'failed', '2025-02-19 08:57:16'),
(3, 10, 'bruite', '2FV39D', 'failed', '2025-02-19 08:57:35'),
(4, 8, 'bruite', '000HU', 'verified', '2025-02-19 09:17:47'),
(5, 3, 'bruite', '0003a', 'verified', '2025-02-19 09:17:51'),
(6, 11, 'bruite', '000T6', 'verified', '2025-02-19 09:17:55'),
(8, 12, 'bruite', 'dzddz', 'failed', '2025-02-19 09:18:43'),
(9, 3, 'bruite', '0003a', 'verified', '2025-02-19 09:18:48'),
(10, 3, 'bruite', '0003a', 'verified', '2025-02-19 09:18:52'),
(11, 7, 'bruite', '000AQ', 'verified', '2025-02-19 09:40:39');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `captchas_bruite`
--
ALTER TABLE `captchas_bruite`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `captchas_segmented`
--
ALTER TABLE `captchas_segmented`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `captcha_verifications`
--
ALTER TABLE `captcha_verifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `captcha_id` (`captcha_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `captchas_bruite`
--
ALTER TABLE `captchas_bruite`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `captchas_segmented`
--
ALTER TABLE `captchas_segmented`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `captcha_verifications`
--
ALTER TABLE `captcha_verifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `captcha_verifications`
--
ALTER TABLE `captcha_verifications`
  ADD CONSTRAINT `captcha_verifications_ibfk_1` FOREIGN KEY (`captcha_id`) REFERENCES `captchas_bruite` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `captcha_verifications_ibfk_2` FOREIGN KEY (`captcha_id`) REFERENCES `captchas_segmented` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
