<?PHP

spl_autoload_register(function ($class){
    require __DIR__ . "/$class.php";
});

set_exception_handler("ErrorHandler::handleException");

// require_once("ErrorHandler.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $contmethod = $_GET["cont"];
    $title = $_GET["title"];
    $args = @$_GET["args"];

    $cont = explode(":", $contmethod);
    $controller = $cont[0];
    $action = $cont[1];

    $record = [
        "title" => $title,
        "args" => $args
    ];
    require($controller.".php");
    $controllerInstance = new $controller;
    $controllerInstance->$action($record);
}
?>