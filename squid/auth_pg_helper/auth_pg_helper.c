#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <getopt.h>
#include <libpq-fe.h>



#define BUFSIZE 8192
#define MAX_CRED_SIZE 256

FILE *logfile = NULL;
PGconn *conn = NULL;

char *host = NULL;
char *port = NULL;
char *dbname = NULL;



int main(int argc, char *argv[]) {

    logfile = fopen("./input.log", "a");
    
    if (!logfile) {
        fprintf(logfile, "Cannot open log file\n");
        return 1;
    }

    // args_validator(argc, argv);


    if (!init_database()) {
        fprintf(logfile, "Failed to initialize database connection\n");
        return 1;
    }else{
        fprintf(logfile, "Started\n");

        fflush(logfile);
    }

    
    char buf[BUFSIZE];
    char username[MAX_CRED_SIZE];
    char password[MAX_CRED_SIZE];
    
    // Инициализируем подключение к базе данных
    
    
    // Отключаем буферизацию
    setbuf(stdout, NULL);
    
    while (fgets(buf, BUFSIZE, stdin)) {


        fprintf(logfile, "Input: %s\n", buf);
        fflush(logfile);
        // Удаляем символ новой строки
        if (sscanf(buf, "%s %s", username, password) == 2) {
            fprintf(logfile, "Username: %s\n", username);
            fprintf(logfile, "Password: %s\n", password);
        } else {
            fprintf(logfile, "Failed to parse username and password\n");
        }

       

        if (!username || !password) {
            printf("ERR\n");
            continue;
        }
        
        // Проверяем учетные данные
        if (check_credentials(username, password)) {
            printf("OK\n");
        } else {
            printf("ERR\n");
        }
    } 
    
    // Закрываем соединение с базой данных
    if (conn) {
        PQfinish(conn);
    }
    if (logfile) {
        fclose(logfile);
    }
    return 0;

}





void args_validator(int argc, char *argv[]) {
	int opt;

    // Определение длинных опций
    static struct option long_options[] = {
        {"host", required_argument, 0, 'h'},
        {"port", required_argument, 0, 'p'},
        {"dbname", required_argument, 0, 'd'},
        {0, 0, 0, 0}
    };

    while ((opt = getopt_long(argc, argv, "h:p:d:", long_options, NULL)) != -1) {
        switch (opt) {
            case 'h':
                host = optarg;
                break;
            case 'p':
                port = optarg;
                break;
            case 'd':
                dbname = optarg;
                break;
            default:
                fprintf(logfile, "Usage: %s --host <host> --port <port> --dbname <dbname>\n", argv[0]);
                exit(EXIT_FAILURE);
        }
    }

    // Проверка обязательных параметров
    if (!host || !port || !dbname) {
        fprintf(logfile, "Missing required parameters\n");
        fprintf(logfile, "Usage: %s --host <host> --port <port> --dbname <dbname>\n", argv[0]);
        exit(EXIT_FAILURE);
    }

    // printf("Host: %s\n", host);
    // printf("Port: %s\n", port);
    // printf("Database: %s\n", dbname);
}


int check_credentials(const char *username, const char *password) {
    PGresult *res;
    int authenticated = 0;
    
    // Подготавливаем SQL запрос
    // Важно: используйте подготовленные выражения для защиты от SQL-инъекций
    const char *paramValues[2];
    paramValues[0] = username;
    paramValues[1] = password;

    res = PQexecParams(conn,
        "SELECT COUNT(*) FROM auth WHERE username = $1 AND password = $2 AND avail = TRUE",
        2,       // количество параметров
        NULL,    // позволяет PostgreSQL определить типы
        paramValues,
        NULL,    // длины параметров не указаны
        NULL,    // все параметры в текстовом формате
        0);      // ожидаем результат в текстовом формате

    if (PQresultStatus(res) != PGRES_TUPLES_OK) {
        fprintf(logfile, "SELECT failed: %s\n", PQerrorMessage(conn));
        PQclear(res);
        return 0;
    }

    // Проверяем результат
    if (atoi(PQgetvalue(res, 0, 0)) > 0) {
        authenticated = 1;
    }

    PQclear(res);
    return authenticated;
}

int init_database() {
    char conninfo[512];


    conn = PQconnectdb("host=127.0.0.1 port=5432 dbname=squid user=squid password=qwerty");

    if (PQstatus(conn) != CONNECTION_OK) {
        fprintf(logfile, "Connection to database failed: %s\n",
                PQerrorMessage(conn));
        PQfinish(conn);
        return 0;
    }
    return 1;
}


