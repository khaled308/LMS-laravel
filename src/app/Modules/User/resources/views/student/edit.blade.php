@extends('dashboard::layouts.main')

@section('content')
<section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <!-- general form elements -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Create Student User</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->
            <form method="POST" action="{{route('students.update', $student->id)}}" enctype="multipart/form-data">
                @csrf
                @method('PUT')
              <div class="card-body">
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="first_name">First Name</label>
                            <input type="text" class="form-control" id="class" placeholder="Enter First Name" name="first_name" value="{{old('first_name', optional($student->student_info)->first_name)}}">
                              @error('first_name')
                                  <div class="alert alert-danger">{{ $message }}</div>
                              @enderror
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="last_name">Last Name</label>
                            <input type="text" class="form-control" id="class" placeholder="Enter Last Name" name="last_name" value="{{old('last_name', optional($student->student_info)->last_name)}}">
                              @error('last_name')
                                  <div class="alert alert-danger">{{ $message }}</div>
                              @enderror
                        </div>
                    </div>
                    <div class="form-group col">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" value="{{old('email', $student->email)}}">
                          @error('email')
                              <div class="alert alert-danger">{{ $message }}</div>
                          @enderror
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col">
                        <label for="class">Class</label>
                        <select class="form-control" name="class_id">
                            <option value="">Class</option>
                            @foreach ($classes as $class)
                                <option value="{{ $class->id }}" {{optional($student->student_info)->class_id == $class->id ? 'selected' : ''}}>{{ $class->name }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col">
                        <label for="gender">Gender</label>
                        <select class="form-control" name="gender">
                            <option value="">Gender</option>
                            <option value="male" {{optional($student->student_info)->gender== 'male' ? 'selected' : ''}}>Male</option>
                            <option value="female" {{optional($student->student_info)->gender== 'female' ? 'selected' : ''}}>Female</option>
                        </select>
                    </div>
                    <div class="col form-group">
                        <label for="photo">Photo</label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="customFile" name="photo">
                            <label class="custom-file-label" for="customFile">Choose file</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col">
                        <label for="address">Address</label>
                        <input type="text" class="form-control" id="address" placeholder="Enter address" name="address" value="{{old('address', optional($student->student_info)->address)}}">
                            @error('address')
                                <div class="alert alert-danger">{{ $message }}</div>
                            @enderror
                    </div>
                    <div class="form-group col">
                        <label for="place_of_birth">Place of Birth</label>
                        <input type="text" class="form-control" id="place_of_birth" placeholder="Enter place of birth" name="place_of_birth" value="{{old('place_of_birth', optional($student->student_info)->place_of_birth)}}">
                            @error('place_of_birth')
                                <div class="alert alert-danger">{{ $message }}</div>
                            @enderror
                    </div>
                    <div class="form-group col">
                        <label for="nationality">Nationality</label>
                        <input type="text" name="nationality" id="nationality" class="form-control" placeholder="Nationality" value="{{old('nationality', optional($student->student_info)->nationality)}}">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col">
                        <label for="date_of_birth">Date of Birth</label>
                        <input type="date" class="form-control" id="date_of_birth" placeholder="Enter date of birth" name="date_of_birth" value="{{old('date_of_birth', optional($student->student_info)->date_of_birth)}}">
                            @error('date_of_birth')
                                <div class="alert alert-danger">{{ $message }}</div>
                            @enderror
                    </div>
                    <div class="form-group col">
                        <label for="religion">Religion</label>
                        <select class="form-control" name="religion">
                            <option value="">Religion</option>
                            <option value="islam" {{optional($student->student_info)->religion== 'islam' ? 'selected' : ''}}>Islam</option>
                            <option value="other" {{optional($student->student_info)->religion== 'other' ? 'selected' : ''}}>other</option>
                        </select>
                    </div>
                    <div class="form-group col">
                        <label for="phone_number">Phone Number</label>
                        <input type="text" class="form-control" id="phone_number" placeholder="Enter phone number" name="phone_number" value="{{old('phone_number', optional($student->student_info)->phone_number)}}">
                            @error('phone_number')
                                <div class="alert alert-danger">{{ $message }}</div>
                            @enderror
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col">
                        <label for="blood_group">Blood Group</label>
                        <select class="form-control" name="blood_group">
                            <option value="">Blood Group</option>
                            <option value="A" {{optional($student->student_info)->blood_group== 'A' ? 'selected' : ''}}>A</option>
                            <option value="B" {{optional($student->student_info)->blood_group== 'B' ? 'selected' : ''}}>B</option>
                            <option value="AB" {{optional($student->student_info)->blood_group== 'AB' ? 'selected' : ''}}>AB</option>
                            <option value="O" {{optional($student->student_info)->blood_group== 'O' ? 'selected' : ''}}>O</option>
                        </select>
                    </div>
                    <div class="form-group col">
                        <label for="weight">weight</label>
                        <input type="text" oninput="this.value = this.value.replace(/[^0-9\.]|(\.(?=.*\.))/g, '');" class="form-control" id="weight" name="weight" value="{{old('weight', optional($student->student_info)->weight)}}">
                            @error('weight')
                                <div class="alert alert-danger">{{ $message }}</div>
                            @enderror
                    </div>
                    <div class="form-group col">
                        <label for="height">height</label>
                        <input type="text" oninput="this.value = this.value.replace(/[^0-9\.]|(\.(?=.*\.))/g, '');" class="form-control" id="height" name="height" value="{{old('height', optional($student->student_info)->height)}}">
                            @error('height')
                                <div class="alert alert-danger">{{ $message }}</div>
                            @enderror
                    </div>
                </div>
              </div>
              <!-- /.card-body -->

              <div class="card-footer">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
          <!-- /.card -->
        </div>
      </div>
      <!-- /.row -->
    </div><!-- /.container-fluid -->
  </section>
@endsection