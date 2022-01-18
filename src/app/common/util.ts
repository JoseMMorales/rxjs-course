import { Observable } from "rxjs";
import { subscribeOn } from "rxjs/operators";
import { Payload } from "../model/course";

export function createHttpObservable(url: string): Observable<Payload> {
  return new Observable((observer) => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, { signal })
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        observer.next(body);

        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
      });

    return () => controller.abort();
  });
}
