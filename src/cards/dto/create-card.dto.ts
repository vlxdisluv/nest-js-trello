import { IsString, IsDefined } from 'class-validator';

export class CreateCardDto {
  // @IsString()
  // @IsDefined()
  readonly title: string;

  // @IsString()
  // @IsDefined()
  readonly description: string;
}
