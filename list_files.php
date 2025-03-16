<?php
header('Content-Type: application/json');

// Включаем отображение ошибок для отладки
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    // Получаем список файлов в текущей директории
    $files = scandir(__DIR__);
    
    if ($files === false) {
        throw new Exception('Не удалось получить список файлов');
    }

    // Фильтруем только HTML файлы и исключаем системные файлы
    $htmlFiles = array_filter($files, function($file) {
        return strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'html' 
               && !in_array($file, ['.', '..', '.DS_Store'])
               && !str_starts_with($file, '.');
    });

    // Сортируем файлы по алфавиту
    sort($htmlFiles);

    // Отправляем результат
    echo json_encode([
        'success' => true,
        'files' => array_values($htmlFiles)
    ]);

} catch (Exception $e) {
    // В случае ошибки отправляем информацию об ошибке
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?> 