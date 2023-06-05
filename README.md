### snr_cpe_local_mirror
Локальное зеркало для обновления прошивок SNR CPE for lanta-net.

Сделав статическую запись в DNS для домена "update.snr.systems". 
Перенаправляем запросы от CPE на локальное зеркало обновлений

### Enviroments
.env.production содерждит информацию о текущей актуальнйо версии ПО
.env.production - тестовые сборки

### Firmvare files
Имена файлов с прошивками находятся в файле cpeDevices.js 

### Пример строки запроса со стороны клиента    
/update.xml?fw=20211221&version=1.10.0&mac=F8:F0:82:B0:C5:6B&ip=37.235.156.101&model=SNR-CPE-MD1.1&sn&customid

Query String Splitter
'fw':
20211221
'version':
1.10.0
'mac':
F8:F0:82:B0:C5:6B
'ip':
37.235.156.101
'model':
SNR-CPE-MD1.1
'sn':
'customid':