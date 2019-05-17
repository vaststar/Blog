ALTER USER 'root'@'%' IDENTIFIED BY 'blog_mysql_password' PASSWORD EXPIRE NEVER;
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'blog_mysql_password';
flush privileges;