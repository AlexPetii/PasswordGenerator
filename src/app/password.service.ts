
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PasswordService {

    private readonly letters =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    private readonly numbers = '0123456789';

    private readonly symbols = '!@#$%^&*()_+-=?';

    private randomIndex(max: number): number {
        const array = new Uint32Array(1);
        const range = 0x100000000;
        const limit = Math.floor(range / max) * max;

        do {
            crypto.getRandomValues(array);
        } while (array[0] >= limit);

        return array[0] % max;
    }

    generate(
        length: number,
        includeNumbers: boolean,
        includeSymbols: boolean
    ): string {

        if (
            !Number.isInteger(length) ||
            length < 4 ||
            length > 64
        ) {
            throw new Error('Invalid password length');
        }

        const groups: string[] = [this.letters];

        if (includeNumbers) {
            groups.push(this.numbers);
        }

        if (includeSymbols) {
            groups.push(this.symbols);
        }

        const allCharacters = groups.join('');


        const password: string[] = groups.map(group => {
            return group[this.randomIndex(group.length)];
        });

        while (password.length < length) {
            const index = this.randomIndex(allCharacters.length);
            password.push(allCharacters[index]);
        }

        for (let i = password.length - 1; i > 0; i--) {
            const j = this.randomIndex(i);

            [password[i], password[j]] =
                [password[j], password[i]];
        }

        return password.join('');
    }
}
