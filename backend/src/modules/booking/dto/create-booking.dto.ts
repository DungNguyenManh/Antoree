export class CreateBookingDto {
    studentId: string;
    teacherId: string;
    time: string; // ISO string, bắt buộc
    note?: string; // Ghi chú, không bắt buộc
    status?: 'pending' | 'confirmed' | 'cancelled';
}