export class CreateBookingDto {
    studentId: string;
    teacherId: string;
    time: string; // ISO string
    status?: 'pending' | 'confirmed' | 'cancelled';
}
