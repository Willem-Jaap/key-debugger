'use client';

import { useEffect, useState } from 'react';

interface Event {
    id?: number;
    name: string;
    text: string;
    elapsed?: number;
}

const Page = () => {
    const [startTime, setStartTime] = useState<number>(0);
    const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        setStartTime(Date.now());
        const keyMouseMessages = {
            0: '0: Main button pressed, usually the left button or the un-initialized state',
            1: '1: Auxiliary button pressed, usually the wheel button or the middle button (if present)',
            2: '2: Secondary button pressed, usually the right button',
            3: '3: Fourth button, typically the Browser Back button',
            4: '4: Fifth button, typically the Browser Forward button',
        } as Record<number, string>;

        const addEvent = (event: Event) => {
            console.log(Date.now(), startTime);

            event.elapsed = Date.now() - startTime;
            // Add to events and set current event
            setEvents(prev => [...prev, event]);
            setCurrentEvent(event);
        };

        const onMouseDown = (e: MouseEvent) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            addEvent({
                name: 'Mouse Down',
                text: `Button: ${keyMouseMessages[e.button] ?? 'Unknown button'}, at ${e.clientX}, ${e.clientY}`,
            });
        };

        const onMouseUp = (e: MouseEvent) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            addEvent({
                name: 'Mouse Up',
                text: `Button: ${keyMouseMessages[e.button] ?? 'Unknown button'}, at ${e.clientX}, ${e.clientY}`,
            });
        };

        const onClick = (e: MouseEvent) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            addEvent({
                name: 'Click',
                text: `Button: ${keyMouseMessages[e.button] ?? 'Unknown button'}, at ${e.clientX}, ${e.clientY}`,
            });
        };

        const onKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            addEvent({
                name: 'Key Down',
                text: `Key: ${e.key}, Code: ${e.code}`,
            });
        };

        const onKeyUp = (e: KeyboardEvent) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            addEvent({
                name: 'Key Up',
                text: `Key: ${e.key}, Code: ${e.code}`,
            });
        };

        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('click', onClick);
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        return () => {
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('click', onClick);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, [startTime]);

    return (
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <div className="flex-1 rounded-xl border border-neutral-800 p-12">
                {/* Render current event in a nice card */}
                {currentEvent ? (
                    <div className="mx-auto flex max-w-4xl flex-col gap-2 rounded-lg border border-dashed border-neutral-700 p-4">
                        <h1 className="text-2xl font-medium">{currentEvent.name}</h1>
                        <p>{currentEvent.text}</p>
                    </div>
                ) : (
                    <div className="mx-auto flex max-w-4xl flex-col gap-2 rounded-lg border border-dashed border-neutral-700 p-4 text-neutral-500">
                        <h1 className="text-xl font-medium">No event captured</h1>
                        <p>Click or tap on an event to view it here.</p>
                    </div>
                )}
            </div>
            <div className="flex h-[calc(100vh-16rem)] flex-[0.4] flex-col overflow-hidden overflow-y-auto rounded-xl border border-neutral-800 md:max-w-sm">
                {/* Render all events in a scrollable list */}
                {events.map((event, i) => (
                    <div
                        key={i}
                        className="flex cursor-pointer justify-between gap-2 border-b border-neutral-800 px-4 py-2 hover:bg-neutral-800/20"
                        onClick={() => setCurrentEvent(event)}>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-lg font-medium">{event.name}</h1>
                            <p className="text-sm text-neutral-500">
                                {event.elapsed?.toLocaleString()} ms
                            </p>
                        </div>
                        <button
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800/20 text-sm text-neutral-400 hover:bg-neutral-800/40"
                            onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurrentEvent(event);
                            }}>
                            Inspect
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
