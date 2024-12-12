import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';

interface EventColor {
  primary: string;
  secondary: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  private apiKey = 'TU_API_KEY';
  private clientId = 'TU_CLIENT_ID';
  private apiUrl = 'https://www.googleapis.com/calendar/v3';

  // Definir colores para eventos
  private colors: { [key: string]: EventColor } = {
    rojo: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    azul: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    amarillo: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  constructor(private http: HttpClient) {}

  getEvents(): Observable<CalendarEvent[]> {
    return this.http.get(`${this.apiUrl}/events?key=${this.apiKey}`).pipe(
      map((response: any) => {
        return response.items.map((item: any) => this.convertToCalendarEvent(item));
      })
    );
  }

  createEvent(event: CalendarEvent): Observable<CalendarEvent> {
    const googleEvent = this.convertToGoogleEvent(event);
    return this.http.post(`${this.apiUrl}/events?key=${this.apiKey}`, googleEvent).pipe(
      map((response: any) => this.convertToCalendarEvent(response))
    );
  }

  updateEvent(event: CalendarEvent): Observable<CalendarEvent> {
    const googleEvent = this.convertToGoogleEvent(event);
    return this.http.put(`${this.apiUrl}/events/${event.id}?key=${this.apiKey}`, googleEvent).pipe(
      map((response: any) => this.convertToCalendarEvent(response))
    );
  }

  createMeetLink(event: CalendarEvent): Observable<string> {
    return this.http.post(`${this.apiUrl}/events/${event.id}/conferenceData?key=${this.apiKey}`, {
      conferenceData: {
        createRequest: {
          requestId: Date.now().toString(),
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    }).pipe(
      map((response: any) => response.conferenceData.entryPoints[0].uri)
    );
  }

  private convertToCalendarEvent(googleEvent: any): CalendarEvent {
    return {
      id: googleEvent.id,
      start: new Date(googleEvent.start.dateTime || googleEvent.start.date),
      end: new Date(googleEvent.end.dateTime || googleEvent.end.date),
      title: googleEvent.summary,
      color: this.getEventColor(googleEvent),
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      meta: {
        isMeetEnabled: !!googleEvent.conferenceData,
        meetLink: googleEvent.conferenceData ? googleEvent.conferenceData.entryPoints[0].uri : ''
      }
    };
  }

  private convertToGoogleEvent(event: CalendarEvent): any {
    return {
      summary: event.title,
      start: {
        dateTime: event.start.toISOString(),
        timeZone: 'UTC'
      },
      end: {
        dateTime: event.end.toISOString(),
        timeZone: 'UTC'
      },
      conferenceData: event.meta && event.meta.isMeetEnabled ? {
        createRequest: {
          requestId: Date.now().toString(),
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      } : null
    };
  }

  private getEventColor(googleEvent: any): EventColor {
    // Implementa tu lógica de color aquí basada en las propiedades del evento de Google Calendar
    // Por ahora, simplemente devolvemos azul para todos los eventos
    return this.colors.azul;
  }
}