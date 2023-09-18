@extends('dashboard::layouts.main')

@section('content')
<section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <!-- general form elements -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Update Admin User</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->
            <form method="POST" action="{{route('admins.update', $admin->id)}}">
                @csrf
                @method('put')
              <div class="card-body">
                <div class="form-group">
                  <label for="name">Admin Name</label>
                  <input type="text" class="form-control" id="name" placeholder="Enter Admin Name" name="name" value="{{old('name', $admin->name)}}">
                    @error('name')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
                </div>
                <div class="form-group">
                  <label for="email">Email address</label>
                  <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" value="{{old('email', $admin->email)}}">
                    @error('email')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
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