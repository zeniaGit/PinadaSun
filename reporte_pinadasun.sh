#!/bin/bash
# reporte_pinadasun.sh

LOG_FILE="/var/log/pinadasun_visitors.log"
DATE_YESTERDAY=$(python3 -c "from datetime import datetime, timedelta; print((datetime.now() - timedelta(days=1)).strftime('%d/%b/%Y'))")

REPORT="======================================\n"
REPORT+=" PinadaSun Visitor Report for $DATE_YESTERDAY\n"
REPORT+="======================================\n\n"

if [ ! -f "$LOG_FILE" ]; then
    REPORT+="Aún no hay visitas registradas (el archivo de log no existe).\n"
else
    YESTERDAY_LOGS=$(grep "^\[$DATE_YESTERDAY\]" "$LOG_FILE")
    if [ -z "$YESTERDAY_LOGS" ]; then
        REPORT+="No visits recorded for $DATE_YESTERDAY.\n"
    else
        TOTAL_REQUESTS=$(echo "$YESTERDAY_LOGS" | wc -l)
        TOP_IPS=$(echo "$YESTERDAY_LOGS" | awk -F'|' '{print $2}' | tr -d ' ' | sort | uniq -c | sort -rn | head -n 3 | awk '{print "  - " $2 " (" $1 " requests)"}')
        TOP_PATHS=$(echo "$YESTERDAY_LOGS" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $3); print $3}' | sort | uniq -c | sort -rn | head -n 3 | awk '{print "  - " $2 " (" $1 " requests)"}')

        REPORT+="Total Requests: $TOTAL_REQUESTS\n\n"
        REPORT+="Top 3 Visitor IP Addresses:\n"
        [ -z "$TOP_IPS" ] && REPORT+="  None\n" || REPORT+="$TOP_IPS\n"
        REPORT+="\nTop 3 Requested Pages:\n"
        [ -z "$TOP_PATHS" ] && REPORT+="  None\n" || REPORT+="$TOP_PATHS\n"
    fi
fi

REPORT+="\n======================================\n"

# Enviar correo: buscar el binario disponible en el NAS (cron no tiene el PATH completo)
MAILER=""
for c in /usr/sbin/sendmail /usr/lib/sendmail /usr/bin/sendmail /usr/local/bin/sendmail /usr/bin/ssmtp /usr/sbin/ssmtp /usr/syno/sbin/sendmail /usr/syno/bin/sendmail /opt/bin/sendmail; do
    [ -x "$c" ] && MAILER="$c" && break
done

echo -e "$REPORT"

if [ -z "$MAILER" ]; then
    echo "ERROR: no se encontró sendmail/ssmtp. Binarios de correo disponibles:"
    ls /usr/syno/bin /usr/syno/sbin /usr/bin /usr/sbin /usr/local/bin 2>/dev/null | grep -iE "mail|smtp|notify"
    exit 1
fi

"$MAILER" -t <<EOF
From: info@movilando.com
To: info@movilando.com
Subject: Reporte Diario PinadaSun
Content-Type: text/plain; charset=UTF-8

$(echo -e "$REPORT")
EOF

exit 0
