<?PHP

//TODO: Clase para captura del error y despiegue visual
class ErrorHandler{

    public static function handleException(Throwable $exception): void {
        $errArr = [
            "code" => $exception->getCode(),
            "message" => $exception->getMessage(),
            "file" => $exception->getFile(),
            "line" => $exception->getLine()
        ];
        extract($errArr);
        require(__DIR__ . "/../Views/error/error.php");

    }

}