import type { IEventGetBody } from "@/interfaces/Https";

export const calendars = {
    mandatoryEvents: {
        colorName: 'mandatory-events',
        lightColors:{
            main: '#7a163c',
            container: '#7a163c',
            onContainer: '#ffffff',
        }
    },
    optionalEvents:{
        colorName: 'optional-events',
        lightColors:{
            main: '#54BB48',
            container: '#54BB48',
            onContainer: '#ffffff',
        }
    },
};

export const eventCalendarLogic = (event : IEventGetBody) => JSON.parse(event.is_mandatory.toString()) ? 'mandatoryEvents' : 'optionalEvents';