export class CreateTeacherDto {
    name: string;
    bio?: string;
    avatarUrl?: string;
    languages?: string[];
    availableTimes?: string[];
}
