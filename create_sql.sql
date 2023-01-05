CREATE DATABASE mobile;

CREATE TABLE operators(
id INT PRIMARY KEY AUTO_INCREMENT,
operator_name VARCHAR(100)
)ENGINE=INNODB;

CREATE TABLE base_station(
    id INT PRIMARY KEY AUTO_INCREMENT,
    bs_name VARCHAR(50),
    bs_latitude VARCHAR(20),
    bs_longitude VARCHAR(20),
    bs_comment VARCHAR(200),
    bs_operator INT,
    bs_2g BOOLEAN DEFAULT 0,
    bs_3g BOOLEAN DEFAULT 0,
    bs_4g BOOLEAN DEFAULT 0,
    bs_status BOOLEAN DEFAULT 0,
    FOREIGN KEY (bs_operator) REFERENCES operators (id)
)ENGINE=INNODB;

CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(20) UNIQUE,
    user_pass VARCHAR(200),
    user_full_name VARCHAR(50),
    root_access BOOLEAN DEFAULT 0
)ENGINE=INNODB;

CREATE TABLE lines_oper(
    id INT PRIMARY KEY AUTO_INCREMENT,
    hint VARCHAR(200),
    stroke_color VARCHAR(7) DEFAULT '#de66ff',
    stroke_width INT DEFAULT 4,
    geoCoords JSON DEFAULT NULL
)ENGINE=INNODB;

CREATE USER 'mobile'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON mobile.* TO 'mobile'@'localhost' IDENTIFIED BY 'test' WITH GRANT OPTION;
SHOW GRANTS FOR 'mobile'@'localhost';
FLUSH PRIVILEGES;

INSERT operators(operator_name) VALUES('Mir-Telekom');
INSERT operators(operator_name) VALUES('K-Telekom');
INSERT operators(operator_name) VALUES('Phoenix');

INSERT users(user_name, user_pass, user_full_name) VALUES('test', '098f6bcd4621d373cade4e832627b4f6', 'Иван Иванов');

INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES('UH0801', '46.6399333333333', '32.6268083333333', "г,Херсон, ул,Перекопская,5, (46°38'23,76 32°37'36,51 Трубостойки. Контейнер.  КРРТ", 1, 1, 1, 1, 1);
INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES('UH0802', '46.6451583333333', '32.5681944444444', "г,Херсон, ул,И,Богуна Ильича,95, (46°38'42,57 32°34'5,50 Трубостойки. Контейнер.", 1, 0, 0, 1, 1);
INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES('UH0803', '46.6702222222222', '32.6164944444444', "г,Херсон, ул,49 Гвардейской дивизии,15, (46°40'12,80 32°36'59,38 Трубостойки. Помещение.", 1, 1, 1, 0, 1);
INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES('UH0804', '46.6592577777777', '32.6349155555555', "г,Херсон,", 1, 1, 1, 0, 0);
INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES('UH0805', '46.6567066666666', '32.6069400000000', "г,Херсон,", 1, 0, 1, 1, 1);

INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES('ZN0201', '46.6399300000000', '32.6268088888888', "г,Херсон", 2, 1, 1, 1, 1);
INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES('ZN0202', '46.6410500000000', '32.5623966666666', "г,Херсон", 2, 0, 0, 1, 1);
INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES('ZN0203', '46.6675011111111', '32.6160300000000', "г,Херсон", 2, 1, 1, 0, 1);
INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES('ZN0204', '46.6634699999999', '32.6274077777777', "г,Херсон", 2, 1, 1, 0, 1);
INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES('ZN0205', '46.6791477777777', '32.6441099999999', "г,Херсон", 2, 0, 0, 1, 1);

INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES('HP0201', '46.6273477777777', '32.6048966666666', "г,Херсон", 3, 1, 0, 1, 1);
INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES('HP0202', '46.6283488888888', '32.5662333333333', "г,Херсон", 3, 0, 0, 1, 1);
INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES('HP0203', '46.6314911111111', '32.6269211111111', "г,Херсон", 3, 1, 0, 0, 1);
INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES('HP0204', '46.6418822222222', '32.6406799999999', "г,Херсон", 3, 1, 0, 0, 1);
INSERT base_station(bs_name, bs_latitude, bs_longitude, bs_comment, bs_operator, bs_2g, bs_3g, bs_4g, bs_status) VALUES('HP0205', '46.6559711111111', '32.6160511111111', "г,Херсон", 3, 0, 0, 1, 0);


INSERT lines_oper(hint, stroke_color, stroke_width, geoCoords) VALUES('Test', '#de66ff', 5, '[[46.62361381276697,32.6594821166992],[46.62905394604228,32.646435852050786],[46.63165555442548,32.62343322753906],[46.63969609380736,32.596997375488264],[46.65317312433787,32.596997375488264],[46.66262867206148,32.6213732910156],[46.65553716726371,32.63579284667967],[46.63993256205946,32.648152465820296]]')