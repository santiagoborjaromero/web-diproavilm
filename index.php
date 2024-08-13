<?PHP
/**
  * UNIVERSIDAD UNIANDES
  * Facultad de Sistemas Mercantiles
  * Carrera de Software
  * Sexto Semestre
  * Modalidad en Linea
  * Mayo - Septiembre 2024
  * @author 6UG8
  * @copyright 6UG8
  * @created 2024-07-24
  * @license version Alfa
  */
session_start();

// error_reporting(E_ALL);

$jsonString = file_get_contents(__DIR__."/config.json");
$config = json_decode($jsonString, true);

define('BASE_URL', $config["webpath"]);
date_default_timezone_set ($config["timezone"]);

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <base href= "<?php echo BASE_URL;?>" > 
  <title>Diproavilm - Admin</title>
  <link rel="icon" type="image/x-icon" href="assets/images/icono.ico">
  <meta name="description" content="Diproavilm Admistrador">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="robots" CONTENT="noindex">
  <meta name="googlebot" CONTENT="noindex">
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport"/>
  <meta http-equiv="cache-control" content="max-age=0" />
  <meta http-equiv="cache-control" content="no-store, no-cache, mustrevalidate" />
  <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
  <meta http-equiv="expires" content="0" />
  <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
  <meta http-equiv="pragma" content="no-cache" />
  <meta http-equiv="pragma" content="no-cache" />

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Edu+AU+VIC+WA+NT+Hand:wght@400..700&family=Oswald:wght@200..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community@32.0.2/styles/ag-grid.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community@32.0.2/styles/ag-theme-quartz.css" />
  
  <link rel="stylesheet" type="text/css" href="assets/css/main.css">
</head>
<body>
  <div id="mainPage"></div>

  <div id="spinner" class="rotate_div">
    <div class="rotate_child">
      <div class="rotate">
        <img src="assets/images/icono6UG8Blanco.png">
      </div>
      <span id="spinner-text">Cargando</span>
    </div>
  </div>

  <div id="DivForm" class="modal-form" >
    <div class="modal-body" id="MessageDivForm" role='dialog'>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
  <!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script> -->
  <!-- <script src="https://code.jquery.com/ui/1.13.3/jquery-ui.min.js" integrity="sha256-sw0iNNXmOJbQhYFuC9OF2kOlD5KQKe1y5lfBn4C9Sjg=" crossorigin="anonymous"></script> -->
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>


  <!-- Cookie -->
  <script src="//cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
  <!-- Crypto-JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>

  <!-- Venatanas de alerta -->
  <!-- <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script> -->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  
  <!-- AGGRID -->
  <script src="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js"></script>

  <!-- PASSWORD STRENGTH -->
  <script src="https://unpkg.com/check-password-strength/dist/umd.js"></script>

  <!-- MOMENT -->
  <script src="https://momentjs.com/downloads/moment.js"></script>


  <script src="assets/js/main.js"></script>

</body>
</html>