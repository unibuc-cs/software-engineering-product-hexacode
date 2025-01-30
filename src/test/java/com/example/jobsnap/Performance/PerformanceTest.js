import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
    vus: 10,          // Număr de utilizatori virtuali
    duration: '30s',  // Durata testului
};
export default function () {
    const url = 'http://localhost:3000/home'; // Înlocuiește cu URL-ul tău
    const response = http.get(url);
    check(response, {
        'Status Code is 200': (r) => r.status === 200,
        'Response time is < 900ms': (r) => r.timings.duration < 900,
    });
    sleep(1); // Pauză de 1 secundă între request-uri
}