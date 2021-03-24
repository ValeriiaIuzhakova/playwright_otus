import { launch, login, closeAll } from '../lib/browser/browser';
import faker from 'faker';
import fetch from 'node-fetch';

let page;

beforeEach(async () => {
    ({ page } = await launch());

    await login();
});

afterEach(async () => {
    await closeAll();
});

describe('Activities', () => {
    it('Create an activity through UI', async () => {
        const activitySubject = 'Activity ' + faker.lorem.sentence();
        
        await page.click('[data-test="navbar-item-activities"]');
        await page.click('[data-test="addButton-button"]');
        await page.fill('[data-test="activity-subject"]', activitySubject);
        await page.click('[data-test="save-activity-button"]');

        expect(activitySubject)
            .toContain('Activity');
    });

    it('Create an activity', async () => {
        const subject = 'Activity ' + faker.lorem.sentence();

        const res = await fetch('https://api.pipedrive.com/api/v1/activities?api_token=8c9450a39590e4dee8de75b3e1070c4f08d4a210', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject,
            }),
        });

        expect(subject)
            .toContain('Activity');
    });

    it('Edit an activity', async () => {
        const subject = 'Activity ' + faker.lorem.sentence();

        const res = await fetch('https://api.pipedrive.com/api/v1/activities?api_token=8c9450a39590e4dee8de75b3e1070c4f08d4a210', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject,
            }),
        });

        const { data } = await res.json();
        const id  = data.id;

        const res2 = await fetch(`https://api.pipedrive.com/api/v1/activities/${id}?api_token=8c9450a39590e4dee8de75b3e1070c4f08d4a210`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject: '999',
            }),
        });

        expect(subject)
            .toContain('999');
    });

    it('Delete an activity', async () => {
        const subject = 'Activity ' + faker.lorem.sentence();

        const res = await fetch('https://api.pipedrive.com/api/v1/activities?api_token=8c9450a39590e4dee8de75b3e1070c4f08d4a210', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject,
            }),
        });

        const { data } = await res.json();
        const id  = data.id;

        const res2 = await fetch(`https://api.pipedrive.com/api/v1/activities/${id}?api_token=8c9450a39590e4dee8de75b3e1070c4f08d4a210`, {
            method: 'DELETE',
        });

        expect.not.stringContaining(subject);
    });

    it('Open activity calendar view', async () => {

        await page.click('[data-test="navbar-item-activities"]');
        await page.click('[data-text="Calendar"]');
        const url = await page.url();
        
        expect(url).toContain('calendar');
    });
});
