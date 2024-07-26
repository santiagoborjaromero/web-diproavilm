<?PHP

class ErrorHandler{

    public static function handleException(Throwable $exception): void {
        $errArr = [
            "status" => "error",
            "message" => [
                "code" => $exception->getCode(),
                "message" => $exception->getMessage(),
                "file" => $exception->getFile(),
                "line" => $exception->getLine()
            ]
        ];
        print_r($errArr);

    }

}