<?PHP
// error_reporting(E_ALL);
error_reporting(0);

spl_autoload_register(function ($class){
    require __DIR__ . "/$class.php";
});

set_exception_handler("ErrorHandler::handleException");

//TODO: Proceso generico para activar las vistas

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    //TODO: Captura de datos y inclusion del archivo de la vista correspondiente

    $record = [
        $args = $_GET["args"],
    ];
    extract($record);

    $view = $_GET["cont"];
    require(__DIR__ . "/../Views/{$view}/{$view}.php");
}
?>