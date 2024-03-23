import { Marker } from './interfaces';

export function searchAndPlaceMarkers(markers: Array<Marker>, el: HTMLElement) {
    const markersSort = [...markers].sort((a, b) => b.symbols.length - a.symbols.length);

    let isChanged = false;
    
    markersSort.forEach((marker) => {
        if (isChanged) {
            return;
        }
        const symbols = marker.symbols;
        const symbolsEscaped = symbols.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`${symbolsEscaped}(.*)${symbolsEscaped}`, 'g');

        const beforeChanges = el.innerHTML;
        
        el.innerHTML = el.innerHTML.replace(regex, `<span style="background-color: ${marker.color};">$1</span>`);

        if (beforeChanges !== el.innerHTML) {
            isChanged = true;
        }
    });
}